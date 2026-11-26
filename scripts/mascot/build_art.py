"""
Renders the 3D illustrations for the service groups and service cards, in the
same style and colours as the mascot.

    python build_art.py <out_dir> [name ...] [--samples 64]

With no names it renders everything in ART. Each picture is a small scene of
simple objects (an "emblem") on a soft background; group pictures add Growth,
the mascot, presenting. Run scripts/hash-assets.mjs after copying results into
public/.
"""
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

sys.path.insert(0, str(Path(__file__).parent))
import build_mascot as M  # noqa: E402

M.HEX.update({"plum": "453a75", "sage": "6ba58c", "sky": "9fc7d8", "rose": "e9a59b"})

_mats = {}
_root = None


def mat(colour, rough=0.4, metallic=0.0, coat=0.25):
    key = (colour, rough, metallic, coat)
    if key not in _mats:
        _mats[key] = M.material(f"{colour}-{len(_mats)}", colour, rough=rough, metallic=metallic, coat=coat)
    return _mats[key]


def _keep(o):
    if _root is not None:
        M.parent(o, _root)
    return o


def box(size, loc, colour, bevel=0.05, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=[math.radians(a) for a in rot])
    o = bpy.context.object
    o.scale = size
    o.data.materials.append(mat(colour))
    if bevel:
        M.bevel(o, bevel, 4)
        M.smooth(o, 40)
    return _keep(o)


def cyl(radius, depth, loc, colour, rot=(0, 0, 0), bevel=0.03, verts=48, **kw):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=radius, depth=depth, location=loc, rotation=[math.radians(a) for a in rot])
    o = bpy.context.object
    o.data.materials.append(mat(colour, **kw))
    if bevel:
        M.bevel(o, bevel, 4)
    M.smooth(o, 50)
    return _keep(o)


def cone(r1, r2, depth, loc, colour, rot=(0, 0, 0), verts=48):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r1, radius2=r2, depth=depth, location=loc, rotation=[math.radians(a) for a in rot])
    o = bpy.context.object
    o.data.materials.append(mat(colour))
    M.smooth(o, 50)
    return _keep(o)


def sph(radius, loc, colour, scale=(1, 1, 1), **kw):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=radius, location=loc)
    o = bpy.context.object
    o.scale = scale
    o.data.materials.append(mat(colour, **kw))
    M.smooth(o, 180)
    return _keep(o)


def torus(major, minor, loc, colour, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, location=loc, rotation=[math.radians(a) for a in rot])
    o = bpy.context.object
    o.data.materials.append(mat(colour))
    M.smooth(o, 180)
    return _keep(o)


def tube(points, radius, colour):
    return _keep(M.tube("tube", points, radius, mat(colour)))


def plate(outline, y, depth, colour, bevel=0.02):
    o = M.plate("plate", outline, y, depth, mat(colour))
    if bevel:
        M.bevel(o, bevel, 3)
        M.smooth(o, 40)
    return _keep(o)


def arc(radius, start, end, y, z0, x0, thick, colour, steps=10):
    pts = [(x0 + radius * math.cos(math.radians(a)), y, z0 + radius * math.sin(math.radians(a))) for a in [start + (end - start) * i / steps for i in range(steps + 1)]]
    return tube(pts, thick, colour)


# --- emblems: each is built around x=0, standing on z=0, about 1.7 tall, facing -Y ---

def chip(a):
    box((1.5, 0.3, 1.5), (0, 0, 0.95), "forest", 0.12)
    box((0.86, 0.12, 0.86), (0, -0.17, 0.95), a, 0.08)
    for i in range(4):
        for s in (-1, 1):
            box((0.12, 0.16, 0.22), (-0.48 + i * 0.32, 0, 0.95 + s * 0.84), "metal", 0.03)
            box((0.22, 0.16, 0.12), (s * 0.84, 0, 0.47 + i * 0.32), "metal", 0.03)
    for x, z in ((-0.2, 1.1), (0.2, 1.1), (0, 0.78)):
        sph(0.09, (x, -0.24, z), "white")
    tube([(-0.2, -0.24, 1.1), (0, -0.24, 0.78), (0.2, -0.24, 1.1)], 0.03, "white")


def plug(a):
    box((0.8, 0.5, 0.7), (-0.75, 0, 0.95), "forest", 0.1)
    for s in (-1, 1):
        cyl(0.07, 0.34, (-0.2, 0, 0.95 + s * 0.17), "metal", rot=(0, 90, 0), bevel=0, metallic=1.0, rough=0.3)
    box((0.8, 0.5, 0.7), (0.78, 0, 0.95), a, 0.1)
    for s in (-1, 1):
        cyl(0.09, 0.06, (0.37, 0, 0.95 + s * 0.17), "forest", rot=(0, 90, 0), bevel=0)
    tube([(-1.15, 0, 0.95), (-1.5, 0, 0.9), (-1.6, 0, 0.4), (-1.3, 0, 0.12), (-0.6, 0, 0.1)], 0.07, "fern")
    tube([(1.18, 0, 0.95), (1.5, 0, 0.9), (1.6, 0, 0.4), (1.3, 0, 0.12), (0.6, 0, 0.1)], 0.07, "fern")
    for z in (1.5, 1.72):
        sph(0.07, (0.0, 0, z), a)


def gear(cx, cz, radius, colour, teeth=10, y=0.0, phase=0.0):
    cyl(radius, 0.26, (cx, y, cz), colour, rot=(90, 0, 0), bevel=0.03)
    cyl(radius * 0.36, 0.3, (cx, y, cz), "cream", rot=(90, 0, 0), bevel=0.02)
    for i in range(teeth):
        a = phase + i * 360 / teeth
        r = radius + 0.07
        box((0.2, 0.26, 0.2), (cx + r * math.cos(math.radians(a)), y, cz + r * math.sin(math.radians(a))), colour, 0.03, rot=(0, -a, 0))


def gears(a):
    gear(-0.42, 0.78, 0.62, a, 11)
    gear(0.62, 1.28, 0.42, "fern", 8, phase=20)
    gear(0.72, 0.42, 0.3, "forest", 7, phase=5)


def flow(a):
    nodes = [(-0.95, 1.35, "forest"), (0.1, 0.85, a), (0.95, 1.35, "fern"), (0.95, 0.35, "fern")]
    for x, z, c in nodes:
        box((0.7, 0.3, 0.46), (x, 0, z), c, 0.1)
        sph(0.07, (x - 0.18, -0.17, z), "white")
        box((0.26, 0.05, 0.07), (x + 0.1, -0.16, z), "white", 0.02)
    tube([(-0.6, 0, 1.35), (-0.3, 0, 1.3), (-0.25, 0, 0.9)], 0.045, "sage")
    tube([(0.45, 0, 0.9), (0.55, 0, 1.3), (0.62, 0, 1.35)], 0.045, "sage")
    tube([(0.45, 0, 0.8), (0.55, 0, 0.4), (0.62, 0, 0.35)], 0.045, "sage")


def database(a):
    for i, c in enumerate(("forest", "fern", "sage")):
        cyl(0.62, 0.36, (-0.45, 0, 0.24 + i * 0.46), c, bevel=0.06)
        for k in range(3):
            sph(0.045, (-0.75 + k * 0.14, -0.6, 0.24 + i * 0.46), "white")
    for i, h in enumerate((0.55, 0.9, 1.3)):
        box((0.26, 0.26, h), (0.55 + i * 0.36, 0, h / 2), a if i == 2 else "mint", 0.04)


def laptop(a):
    box((1.9, 1.2, 0.1), (0, 0, 0.08), "metal", 0.04)
    box((1.9, 0.1, 1.25), (0, 0.62, 0.72), "forest", 0.05, rot=(-12, 0, 0))
    box((1.66, 0.04, 1.02), (0, 0.55, 0.72), "mint", 0.03, rot=(-12, 0, 0))
    star = [(0.42 * math.cos(math.radians(90 + i * 45)) * (1 if i % 2 == 0 else 0.42), 0.74 + 0.42 * math.sin(math.radians(90 + i * 45)) * (1 if i % 2 == 0 else 0.42)) for i in range(8)]
    plate(star, 0.5, 0.08, a)
    sph(0.08, (0.52, 0.46, 1.08), a)
    sph(0.06, (-0.5, 0.46, 0.42), a)
    box((0.6, 0.36, 0.02), (0, -0.3, 0.14), "sage", 0.01)


def cubeframe(a):
    s, z0 = 0.62, 0.9
    corners = [(x, y, z0 + z) for x in (-s, s) for y in (-s, s) for z in (-s, s)]
    for i, p in enumerate(corners):
        for q in corners[i + 1:]:
            if sum(abs(p[k] - q[k]) > 0.01 for k in range(3)) == 1:
                tube([p, q], 0.045, "fern")
    for p in corners:
        sph(0.1, p, a)
    box((0.62, 0.62, 0.62), (0, 0, z0), "mint", 0.06)
    if _root is not None:
        _root.rotation_euler = (math.radians(8), math.radians(-8), math.radians(32))


def sculpt(a):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.62, location=(0, 0, 1.12))
    o = bpy.context.object
    o.data.materials.append(mat(a))
    _keep(o)
    cyl(0.16, 0.4, (0, 0, 0.42), "metal", bevel=0.02)
    cyl(0.6, 0.14, (0, 0, 0.1), "forest", bevel=0.04)
    box((0.42, 0.42, 0.42), (-1.0, 0, 0.22), "fern", 0.03)
    cone(0.26, 0, 0.55, (0.98, 0, 0.28), "sage")


def studio(a):
    cyl(1.25, 0.08, (0, 0.2, 0.04), "mint", bevel=0.02)
    sph(0.5, (0, 0.1, 0.58), a, rough=0.12, coat=1.0)
    for s in (-1, 1):
        tube([(s * 1.25, 0.5, 0.0), (s * 1.25, 0.5, 1.2)], 0.04, "forest")
        box((0.16, 0.62, 0.8), (s * 1.18, 0.4, 1.45), "forest", 0.04, rot=(0, 0, s * 28))
        box((0.05, 0.54, 0.7), (s * 1.09, 0.34, 1.45), "white", 0.02, rot=(0, 0, s * 28))


def house(a):
    box((1.5, 1.1, 0.95), (-0.15, 0, 0.5), "cream", 0.04)
    plate([(-1.08, 0.95), (-0.15, 1.72), (0.78, 0.95)], 0.62, 1.24, a, 0.03)
    box((0.3, 0.06, 0.52), (-0.5, -0.56, 0.3), "forest", 0.02)
    box((0.42, 0.06, 0.36), (0.18, -0.56, 0.58), "sky", 0.02)
    cyl(0.07, 0.5, (1.12, -0.1, 0.25), "wood", bevel=0)
    cone(0.36, 0, 0.8, (1.12, -0.1, 0.85), "fern")
    cone(0.27, 0, 0.6, (1.12, -0.1, 1.25), "sage")


def towers(a):
    box((2.5, 1.5, 0.08), (0, 0, 0.04), "mint", 0.02)
    for x, y, w, h, c in ((-0.75, 0.1, 0.5, 1.0, "fern"), (-0.1, 0.2, 0.56, 1.62, "forest"), (0.6, 0.0, 0.5, 0.72, a), (0.15, -0.42, 0.34, 0.4, "sage")):
        box((w, w, h), (x, y, 0.08 + h / 2), c, 0.03)
        for k in range(int(h / 0.24)):
            box((w * 0.62, 0.02, 0.07), (x, y - w / 2 - 0.005, 0.24 + k * 0.24), "cream", 0)
    cyl(0.1, 0.9, (0.85, -0.5, 0.2), "white", rot=(0, 90, 24), bevel=0.01)


def bottle(a):
    cyl(0.42, 1.05, (-0.35, 0, 0.55), a, bevel=0.1, rough=0.15, coat=1.0)
    cyl(0.17, 0.3, (-0.35, 0, 1.2), a, bevel=0.03, rough=0.15, coat=1.0)
    cyl(0.2, 0.2, (-0.35, 0, 1.42), "forest", bevel=0.04)
    box((0.5, 0.02, 0.4), (-0.35, -0.42, 0.56), "cream", 0)
    box((0.7, 0.7, 0.95), (0.72, 0.05, 0.5), "mint", 0.03, rot=(0, 0, -18))
    box((0.72, 0.72, 0.12), (0.72, 0.05, 0.98), "fern", 0.03, rot=(0, 0, -18))


def store(a):
    box((1.9, 0.9, 1.05), (0, 0.1, 0.55), "cream", 0.04)
    for i in range(6):
        box((0.33, 0.5, 0.34), (-0.82 + i * 0.33, -0.42, 1.2), a if i % 2 == 0 else "white", 0.05, rot=(24, 0, 0))
    box((1.96, 0.94, 0.14), (0, 0.1, 1.42), "forest", 0.04)
    box((0.42, 0.05, 0.7), (0.5, -0.36, 0.38), "forest", 0.02)
    box((0.7, 0.05, 0.42), (-0.38, -0.36, 0.62), "sky", 0.02)
    sph(0.035, (0.36, -0.4, 0.4), "metal")


def headset(a):
    arc(0.62, 15, 165, 0, 0.95, 0, 0.075, "forest", 16)
    for s in (-1, 1):
        box((0.26, 0.42, 0.56), (s * 0.66, 0, 0.92), a, 0.1)
        box((0.12, 0.34, 0.44), (s * 0.5, 0, 0.92), "mint", 0.05)
    tube([(-0.7, -0.12, 0.72), (-0.72, -0.4, 0.5), (-0.4, -0.62, 0.42), (-0.12, -0.66, 0.44)], 0.04, "forest")
    sph(0.1, (-0.08, -0.66, 0.44), "forest")
    box((0.7, 0.28, 0.44), (0.85, 0.1, 1.68), "white", 0.1)
    for k in range(3):
        sph(0.05, (0.67 + k * 0.18, -0.06, 1.68), "fern")


def shield(a):
    outline = [(0, 1.78), (0.8, 1.48), (0.74, 0.78), (0, 0.1), (-0.74, 0.78), (-0.8, 1.48)]
    _keep(M.pillow("shield", M.chaikin(M.cut_corners(outline, 0.16), 3)[::-1], (0, 1.0), 0.34, 0.1, mat("fern")))
    tick = [(-0.36, 1.02), (-0.12, 0.76), (0.4, 1.3)]
    tube([(x, -0.2, z) for x, z in tick], 0.085, "white")
    sph(0.12, (0.9, 0, 0.28), a)
    sph(0.08, (-0.95, 0, 1.6), a)


def megaphone(a):
    cone(0.2, 0.68, 1.25, (0.12, 0, 1.0), a, rot=(0, 72, 0))
    cyl(0.69, 0.09, (0.72, 0, 1.2), "cream", rot=(0, 72, 0), bevel=0.02)
    cyl(0.22, 0.34, (-0.6, 0, 0.77), "forest", rot=(0, 72, 0), bevel=0.04)
    box((0.2, 0.2, 0.62), (-0.32, 0, 0.5), "forest", 0.05, rot=(0, -14, 0))
    for i, r in enumerate((0.3, 0.52)):
        arc(r, -32, 52, 0, 1.24, 0.98, 0.045, "sage", 8)


def compass(a):
    cyl(0.92, 0.2, (0, 0, 0.98), "forest", rot=(90, 0, 0), bevel=0.05)
    cyl(0.76, 0.22, (0, 0, 0.98), "cream", rot=(90, 0, 0), bevel=0.02)
    plate([(0, 0.98 + 0.62), (0.15, 0.98), (-0.15, 0.98)], -0.1, 0.08, a)
    plate([(0, 0.98 - 0.62), (0.15, 0.98), (-0.15, 0.98)], -0.1, 0.08, "fern")
    sph(0.08, (0, -0.2, 0.98), "forest")
    for k in range(4):
        ang = math.radians(k * 90 + 45)
        sph(0.04, (0.6 * math.cos(ang), -0.13, 0.98 + 0.6 * math.sin(ang)), "sage")
    if _root is not None:
        _root.rotation_euler = (0, math.radians(24), 0)


def rocket(a):
    cyl(0.36, 0.9, (0, 0, 0.98), "cream", bevel=0.03)
    cone(0.36, 0.02, 0.6, (0, 0, 1.72), a)
    cone(0.26, 0.36, 0.2, (0, 0, 0.44), "forest")
    cyl(0.15, 0.1, (0, -0.33, 1.12), "sky", rot=(90, 0, 0), bevel=0.02)
    torus(0.15, 0.035, (0, -0.36, 1.12), "forest", rot=(90, 0, 0))
    for s in (-1, 1):
        plate([(s * 0.34, 0.9), (s * 0.78, 0.36), (s * 0.34, 0.5)], 0.05, 0.1, a)
    cone(0.2, 0.0, 0.42, (0, 0, 0.16), a, rot=(180, 0, 0))
    for x, z, r in ((-0.75, 0.16, 0.2), (0.78, 0.14, 0.17), (-0.42, 0.1, 0.13), (0.45, 0.1, 0.12)):
        sph(r, (x, 0.1, z), "white")
    if _root is not None:
        _root.rotation_euler = (0, math.radians(14), 0)


def gamepad(a):
    box((1.3, 0.34, 0.72), (0, 0, 1.0), "forest", 0.16)
    for s in (-1, 1):
        sph(0.5, (s * 0.72, 0, 0.9), "forest", scale=(0.9, 0.36, 1.15))
    box((0.34, 0.08, 0.11), (-0.62, -0.2, 1.05), "cream", 0.03)
    box((0.11, 0.08, 0.34), (-0.62, -0.2, 1.05), "cream", 0.03)
    for dx, dz, c in ((0, 0.14, a), (0.14, 0, "sage"), (-0.14, 0, "white"), (0, -0.14, "rose")):
        cyl(0.07, 0.08, (0.62 + dx, -0.2, 1.05 + dz), c, rot=(90, 0, 0), bevel=0.02)
    for s in (-1, 1):
        box((0.14, 0.06, 0.05), (s * 0.12, -0.19, 1.16), "sage", 0.02)
    if _root is not None:
        _root.rotation_euler = (math.radians(-10), 0, math.radians(-8))


EMBLEMS = dict(chip=chip, plug=plug, gears=gears, flow=flow, database=database, laptop=laptop, cubeframe=cubeframe, sculpt=sculpt, studio=studio,
               house=house, towers=towers, bottle=bottle, store=store, headset=headset, shield=shield, megaphone=megaphone, compass=compass, rocket=rocket, gamepad=gamepad)

# name -> (kind, emblem(s), accent colour, background)
ART = {
    # service cards
    "services/ai-development": ("card", "chip", "amber", "mint"),
    "services/mcp-development": ("card", "plug", "amber", "cream"),
    "services/ai-automation": ("card", "gears", "amber", "mint"),
    "services/workflow-automation": ("card", "flow", "amber", "cream"),
    "services/ai-data-systems": ("card", "database", "amber", "mint"),
    "services/founder-ai-systems": ("card", "laptop", "amber", "cream"),
    "services/3d-software-development": ("card", "cubeframe", "amber", "cream"),
    "services/3d-modeling": ("card", "sculpt", "amber", "mint"),
    "services/3d-rendering": ("card", "studio", "amber", "cream"),
    "services/interior-exterior-design": ("card", "house", "amber", "mint"),
    "services/architecture-planning": ("card", "towers", "amber", "cream"),
    "services/product-modeling-design": ("card", "bottle", "amber", "mint"),
    "services/digital-strategy-consulting": ("card", "compass", "amber", "mint"),
    "services/product-studio-for-startups": ("card", "rocket", "amber", "cream"),
    "services/game-development": ("card", "gamepad", "amber", "mint"),
    # group pictures, with Growth
    "sectors/ai": ("group", ["gears", "chip"], "amber", "mint"),
    "sectors/3d-design": ("group", ["house", "sculpt"], "amber", "cream"),
    "sectors/marketplaces": ("group", ["store", "megaphone"], "amber", "mint"),
    "sectors/consulting": ("group", ["compass", "rocket"], "amber", "cream"),
}
# The four marketplace services, once per marketplace, each with its own accent.
for market, accent, ground in (("amazon", "amber", "cream"), ("ebay", "plum", "mint"), ("walmart", "sky", "cream")):
    for slug, emblem in (("account-management", "store"), ("virtual-assistant", "headset"), ("account-health", "shield"), ("advertising", "megaphone")):
        ART[f"services/{market}-{slug}"] = ("card", emblem, accent, ground)


def emblem(name, accent, loc=(0, 0, 0), scale=1.0, turn=-18):
    global _root
    _root = bpy.data.objects.new(f"emblem-{name}", None)
    bpy.context.collection.objects.link(_root)
    EMBLEMS[name](accent)
    bpy.context.view_layer.update()
    holder = bpy.data.objects.new(f"place-{name}", None)
    bpy.context.collection.objects.link(holder)
    M.parent(_root, holder)
    holder.location = loc
    holder.scale = (scale, scale, scale)
    holder.rotation_euler = (0, 0, math.radians(turn))
    _root = None


def stage(scene, width, height, samples, target, cam_at, lens):
    scene.render.engine = "CYCLES"
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.cycles.device = "CPU"
    scene.render.film_transparent = True
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "Standard"
    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.42
    scene.world = world
    for name, loc, energy, size in (("key", (-3.4, -4.6, 5.4), 420, 4.5), ("fill", (4.6, -3.2, 2.4), 110, 5.0), ("rim", (2.0, 4.6, 4.6), 200, 3.0)):
        d = bpy.data.lights.new(name, "AREA")
        d.energy = energy
        d.size = size
        o = bpy.data.objects.new(name, d)
        o.location = loc
        bpy.context.collection.objects.link(o)
        o.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    # The ground only catches shadows; the background colour is added afterwards.
    bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0))
    bpy.context.object.is_shadow_catcher = True
    cam_d = bpy.data.cameras.new("cam")
    cam_d.lens = lens
    cam = bpy.data.objects.new("cam", cam_d)
    bpy.context.collection.objects.link(cam)
    cam.location = cam_at
    cam.rotation_euler = (Vector(target) - Vector(cam_at)).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam


def render(name, out, samples):
    kind, what, accent, ground = ART[name]
    _mats.clear()
    if kind == "group":
        scene = M.build("point")
        # Growth points to its left (screen left); mirror the whole figure so it presents the objects on the right.
        root = bpy.data.objects["mascot"]
        root.scale = (-1, 1, 1)
        root.location = (-1.75, 0, 0)
        emblem(what[0], accent, loc=(0.55, 0.5, 0), scale=1.0)
        emblem(what[1], accent, loc=(2.3, -0.25, 0), scale=0.8, turn=-26)
        stage(scene, 1100, 733, samples, (0.45, 0, 1.08), (1.7, -12.6, 2.9), 62)
    else:
        bpy.ops.wm.read_factory_settings(use_empty=True)
        scene = bpy.context.scene
        emblem(what, accent)
        stage(scene, 800, 500, samples, (0, 0, 0.86), (1.9, -8.4, 2.6), 78)
    path = out / f"{name}.png"
    path.parent.mkdir(parents=True, exist_ok=True)
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    (out / f"{name}.txt").write_text(ground)


def main():
    args = sys.argv[1:]
    out = Path(args[0])
    samples, names = 64, []
    it = iter(args[1:])
    for a in it:
        if a == "--samples":
            samples = int(next(it))
        else:
            names.append(a)
    for name in names or list(ART):
        render(name, out, samples)


if __name__ == "__main__":
    main()
