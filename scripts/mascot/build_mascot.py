"""
Builds the TDM mascot (the arrow from the TDM logo as a stick-style character) in Blender and renders it.

Run with Blender's Python module (pip install bpy) or inside Blender:
    python build_mascot.py <out_dir> [pose ...] [--size 900] [--samples 96] [--blend]

Everything is made by this script, so the character can be rebuilt, re-posed and
re-rendered at any size without hand work. Poses are listed in POSES below.
"""
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

# --- brand colours (sRGB hex from the site's stylesheet) ---------------------------
HEX = {
    "amber": "e8862d",
    "amber_dark": "c96a17",
    "forest": "0f3527",
    "pine": "1b5e43",
    "fern": "2e7d5b",
    "mint": "dfede6",
    "cream": "f7f5ef",
    "wood": "f1d3a6",
    "white": "ffffff",
    "ink": "10241c",
    "eraser": "f2a7a0",
    "metal": "b9cfc5",
}


def lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def rgb(name):
    h = HEX[name]
    return (lin(int(h[0:2], 16)), lin(int(h[2:4], 16)), lin(int(h[4:6], 16)), 1)


def material(name, colour, rough=0.35, metallic=0.0, coat=0.0, sss=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = rgb(colour)
    b.inputs["Roughness"].default_value = rough
    b.inputs["Metallic"].default_value = metallic
    if "Coat Weight" in b.inputs:
        b.inputs["Coat Weight"].default_value = coat
        b.inputs["Coat Roughness"].default_value = 0.08
    if sss and "Subsurface Weight" in b.inputs:
        b.inputs["Subsurface Weight"].default_value = sss
    return m


def smooth(obj, angle=40):
    for p in obj.data.polygons:
        p.use_smooth = True
    mod = None
    try:
        bpy.context.view_layer.objects.active = obj
        obj.select_set(True)
        bpy.ops.object.shade_auto_smooth(angle=math.radians(angle))
        obj.select_set(False)
    except Exception:
        pass
    return mod


def add(obj_op, mat, name, **kw):
    obj_op(**kw)
    o = bpy.context.object
    o.name = name
    o.data.materials.append(mat)
    return o


def bevel(o, width=0.03, segments=4):
    m = o.modifiers.new("bevel", "BEVEL")
    m.width = width
    m.segments = segments
    m.limit_method = "ANGLE"
    m.angle_limit = math.radians(25)
    return m


def subsurf(o, levels=2):
    m = o.modifiers.new("subsurf", "SUBSURF")
    m.levels = levels
    m.render_levels = levels


def tube(name, points, radius, mat, taper=None):
    """A round limb through the given points (smooth curve)."""
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = radius
    cu.bevel_resolution = 8
    cu.use_fill_caps = True
    sp = cu.splines.new("NURBS")
    sp.points.add(len(points) - 1)
    for p, co in zip(sp.points, points):
        p.co = (*co, 1)
    sp.use_endpoint_u = True
    sp.order_u = min(4, len(points))
    sp.resolution_u = 24
    o = bpy.data.objects.new(name, cu)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(mat)
    return o


def plate(name, outline, y, depth, mat):
    """A flat shape in the X-Z plane (outline as (x, z) points), given some thickness toward the camera."""
    me = bpy.data.meshes.new(name)
    n = len(outline)
    verts = [(x, y, z) for x, z in outline] + [(x, y - depth, z) for x, z in outline]
    faces = [tuple(range(n - 1, -1, -1)), tuple(range(n, 2 * n))] + [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    me.from_pydata(verts, [], faces)
    me.update()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    o.data.materials.append(mat)
    return o


def parent(child, par):
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()


# --- poses -------------------------------------------------------------------------
# Body: lean (deg, + = toward its left / screen right), tilt (deg forward), squash, lift.
# Limbs: hand and foot targets relative to the body; elbows/knees are placed automatically.
# Face: eyes (open|happy|wide|wink), mouth (smile|open|oh|grin), brows (deg), look (x, z).
REST = dict(
    lean=0, tilt=0, squash=1.0, lift=0.0, turn=0,
    hand_l=(-0.62, -0.1, 0.78), hand_r=(0.62, -0.1, 0.78),
    foot_l=(-0.26, 0.0, 0.0), foot_r=(0.26, 0.0, 0.0),
    foot_l_rot=0, foot_r_rot=0,
    eyes="open", mouth="smile", brows=0, look=(0, 0),
)
POSES = {
    "hero": dict(lean=-4, hand_r=(0.95, -0.15, 1.75), hand_l=(-0.62, -0.25, 0.72), mouth="open", brows=6, look=(0.02, 0.01), wave=True),
    "idle1": dict(),
    "idle2": dict(squash=0.97, hand_l=(-0.8, -0.1, 0.52), hand_r=(0.8, -0.1, 0.52), eyes="happy"),
    "wave1": dict(lean=-5, hand_r=(1.05, -0.15, 1.7), mouth="open", brows=6, wave=True),
    "wave2": dict(lean=-3, hand_r=(0.78, -0.15, 1.82), mouth="open", brows=6, wave=True),
    "run1": dict(tilt=14, lift=0.1, hand_l=(-0.5, -0.75, 1.0), hand_r=(0.55, 0.6, 0.6), foot_l=(-0.2, 0.75, 0.42), foot_r=(0.2, -0.7, 0.12), foot_l_rot=55, foot_r_rot=-20, mouth="grin", brows=4),
    "run2": dict(tilt=14, lift=0.02, hand_l=(-0.6, -0.2, 0.7), hand_r=(0.6, 0.1, 0.7), foot_l=(-0.2, 0.15, 0.3), foot_r=(0.2, -0.05, 0.0), foot_l_rot=30, mouth="grin", brows=4),
    "run3": dict(tilt=14, lift=0.1, hand_l=(-0.55, 0.6, 0.6), hand_r=(0.5, -0.75, 1.0), foot_l=(-0.2, -0.7, 0.12), foot_r=(0.2, 0.75, 0.42), foot_l_rot=-20, foot_r_rot=55, mouth="grin", brows=4),
    "run4": dict(tilt=14, lift=0.02, hand_l=(-0.6, 0.1, 0.7), hand_r=(0.6, -0.2, 0.7), foot_l=(-0.2, -0.05, 0.0), foot_r=(0.2, 0.15, 0.3), foot_r_rot=30, mouth="grin", brows=4),
    "jump": dict(tilt=6, lift=0.35, hand_l=(-0.95, -0.1, 1.7), hand_r=(0.95, -0.1, 1.7), foot_l=(-0.34, 0.2, 0.32), foot_r=(0.34, -0.25, 0.22), foot_l_rot=35, foot_r_rot=-15, eyes="wide", mouth="open", brows=10),
    "hit": dict(lean=10, tilt=-12, squash=0.94, hand_l=(-1.0, -0.2, 1.3), hand_r=(1.0, -0.2, 1.2), foot_l=(-0.4, -0.2, 0.0), foot_r=(0.3, 0.1, 0.0), eyes="wide", mouth="oh", brows=-10),
    "cheer": dict(lift=0.2, hand_l=(-0.85, -0.1, 1.85), hand_r=(0.85, -0.1, 1.85), foot_l=(-0.36, 0, 0.2), foot_r=(0.36, 0, 0.2), eyes="happy", mouth="open", brows=8),
    "point": dict(lean=3, hand_l=(-1.25, -0.25, 1.05), hand_r=(0.6, -0.25, 0.72), mouth="grin", look=(-0.03, 0), point=True),
    "peek": dict(lean=-14, hand_r=(0.9, -0.2, 1.55), mouth="smile", eyes="wink", brows=5, wave=True),
}

# --- character ---------------------------------------------------------------------
HIP = 0.78        # height of the hips above the ground (leg length)
SHAFT = 0.92      # length of the arrow's shaft (the torso)
HEAD_W = 0.66     # half-width of the arrowhead
HEAD_H = 1.08     # height of the arrowhead
HEAD_D = 0.34     # thickness of the arrowhead
BASE_LEAN = 9     # the arrow leans to its right, as it does in the logo


def build(pose_name):
    pose = {**REST, **POSES[pose_name]}
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene

    M = dict(
        body=material("body", "fern", rough=0.3, coat=0.6),
        stripe=material("stripe", "amber_dark", rough=0.3, coat=0.6),
        wood=material("wood", "wood", rough=0.6),
        lead=material("lead", "forest", rough=0.25, coat=0.4),
        metal=material("metal", "metal", rough=0.25, metallic=1.0),
        eraser=material("eraser", "eraser", rough=0.7, sss=0.2),
        limb=material("limb", "forest", rough=0.45),
        glove=material("glove", "white", rough=0.5, sss=0.1),
        shoe=material("shoe", "amber", rough=0.4, coat=0.3),
        sole=material("sole", "cream", rough=0.6),
        eye=material("eye", "white", rough=0.15, coat=1.0),
        pupil=material("pupil", "ink", rough=0.1, coat=1.0),
        mouth=material("mouth", "ink", rough=0.4),
        tongue=material("tongue", "eraser", rough=0.5),
        mark=material("mark", "white", rough=0.35),
    )

    root = bpy.data.objects.new("mascot", None)
    bpy.context.collection.objects.link(root)
    body = bpy.data.objects.new("body_pivot", None)
    bpy.context.collection.objects.link(body)
    parent(body, root)

    z0 = HIP
    neck = z0 + SHAFT
    # The shaft of the arrow is the torso: a slim stroke with the slight curve of the logo's rising line.
    shaft = tube("shaft", [(0, 0, z0 - 0.02), (-0.07, 0, z0 + SHAFT * 0.35), (-0.05, 0, z0 + SHAFT * 0.7), (0, 0, neck + 0.12)], 0.115, M["body"])
    parent(shaft, body)
    # The arrowhead is the head: a bold triangle with a notched base, as in the logo.
    outline = [(0, neck + HEAD_H), (HEAD_W, neck - 0.02), (0.2, neck + 0.1), (-0.2, neck + 0.1), (-HEAD_W, neck - 0.02)]
    head = plate("head", outline, HEAD_D / 2, HEAD_D, M["body"])
    bevel(head, 0.11, 8).angle_limit = math.radians(20)
    smooth(head, 50)
    parent(head, body)
    front = -HEAD_D / 2

    # --- face ---
    look = pose["look"]
    eye_z = neck + 0.47
    face = bpy.data.objects.new("face", None)
    bpy.context.collection.objects.link(face)
    face.location = (0, front, eye_z)
    bpy.context.view_layer.update()
    for side in (-1, 1):
        ex = side * 0.2
        kind = pose["eyes"]
        if kind == "wink" and side == 1:
            kind = "happy"
        if kind == "happy":
            arc = tube(f"eye_{side}", [(ex - 0.11, front - 0.03, eye_z - 0.03), (ex - 0.06, front - 0.05, eye_z + 0.05),
                                       (ex + 0.06, front - 0.05, eye_z + 0.05), (ex + 0.11, front - 0.03, eye_z - 0.03)], 0.028, M["mouth"])
            parent(arc, face)
        else:
            s = 1.12 if kind == "wide" else 1.0
            white = add(bpy.ops.mesh.primitive_uv_sphere_add, M["eye"], f"eye_{side}", segments=48, ring_count=24, radius=0.165 * s,
                        location=(ex, front + 0.03, eye_z))
            white.scale = (1, 0.55, 1.18)
            smooth(white, 180)
            pupil = add(bpy.ops.mesh.primitive_uv_sphere_add, M["pupil"], f"pupil_{side}", segments=32, ring_count=16, radius=0.078,
                        location=(ex + look[0] * 2 - side * 0.02, front - 0.058, eye_z + look[1] * 2 - 0.01))
            pupil.scale = (1, 0.45, 1.15)
            smooth(pupil, 180)
            glint = add(bpy.ops.mesh.primitive_uv_sphere_add, M["eye"], f"glint_{side}", segments=16, ring_count=8, radius=0.026,
                        location=(ex + look[0] * 2 - side * 0.02 + 0.03, front - 0.094, eye_z + look[1] * 2 + 0.04))
            smooth(glint, 180)
            for o in (white, pupil, glint):
                parent(o, face)
        # brow: a positive angle lifts the inner end (friendly), a negative one drops it (worried)
        lift = math.sin(math.radians(pose["brows"])) * 0.1
        bz = eye_z + 0.27
        brow = tube(f"brow_{side}", [(ex - side * 0.1, front - 0.04, bz + lift), (ex, front - 0.055, bz + 0.02), (ex + side * 0.1, front - 0.04, bz - lift)], 0.026, M["limb"])
        parent(brow, face)

    mz = eye_z - 0.27
    kind = pose["mouth"]
    if kind in ("smile", "grin"):
        w = 0.17 if kind == "smile" else 0.2
        d = 0.07 if kind == "smile" else 0.1
        m = tube("mouth", [(-w, front - 0.03, mz + 0.03), (-w * 0.5, front - 0.045, mz - d * 0.75), (w * 0.5, front - 0.045, mz - d * 0.75), (w, front - 0.03, mz + 0.03)], 0.026, M["mouth"])
        parent(m, face)
    elif kind == "open":
        w, d = 0.19, 0.17
        outline = [(-w, mz + 0.04)] + [(w * math.cos(math.radians(t)), mz + 0.04 - d * math.sin(math.radians(t))) for t in range(170, 9, -10)] + [(w, mz + 0.04)]
        m = plate("mouth", outline, front + 0.02, 0.035, M["mouth"])
        bevel(m, 0.012, 3)
        parent(m, face)
        t = add(bpy.ops.mesh.primitive_uv_sphere_add, M["tongue"], "tongue", segments=24, ring_count=12, radius=0.085, location=(0, front - 0.012, mz - 0.075))
        t.scale = (1.15, 0.2, 0.6)
        smooth(t, 180)
        parent(t, face)
    else:
        m = add(bpy.ops.mesh.primitive_uv_sphere_add, M["mouth"], "mouth", segments=32, ring_count=16, radius=0.075, location=(0, front, mz - 0.02))
        m.scale = (0.9, 0.35, 1.1)
        smooth(m, 180)
        parent(m, face)

    # The face was laid out at full size; bring it down to fit the arrowhead.
    face.scale = (0.74, 0.74, 0.74)
    parent(face, body)

    # --- body transform ---
    body.location = (0, 0, pose["lift"])
    # Rotate about the bottom of the pencil so leans read as a hip movement.
    pivot = Vector((0, 0, z0))
    lean, tilt = math.radians(pose["lean"] + BASE_LEAN), math.radians(pose["tilt"])
    body.rotation_euler = (-tilt, lean, 0)
    rot = body.rotation_euler.to_matrix()
    body.location = pivot - rot @ pivot + Vector((0, 0, pose["lift"]))
    sq = pose["squash"]
    body.scale = (1 / math.sqrt(sq), 1 / math.sqrt(sq), sq)
    bpy.context.view_layer.update()
    mw = body.matrix_world.copy()

    def on_body(v):
        return mw @ Vector(v)

    # --- arms: from the sides of the barrel to the hand targets ---
    for side, key in ((-1, "hand_l"), (1, "hand_r")):
        shoulder = on_body((side * 0.06, 0.0, z0 + SHAFT * 0.78))
        hand = Vector(pose[key]) + Vector((0, 0, pose["lift"] * 0.6))
        mid = (shoulder + hand) / 2
        raised = hand.z > shoulder.z + 0.3
        bend = Vector((side * (0.22 if raised else 0.12), 0.04, -0.06 if raised else -0.2))
        arm = tube(f"arm_{side}", [tuple(shoulder), tuple(shoulder + Vector((side * 0.14, 0, -0.03))), tuple(mid + bend), tuple(hand)], 0.055, M["limb"])
        parent(arm, root)
        glove = add(bpy.ops.mesh.primitive_uv_sphere_add, M["glove"], f"hand_{side}", segments=32, ring_count=16, radius=0.15, location=tuple(hand))
        glove.scale = (1, 0.8, 1.05)
        smooth(glove, 180)
        parent(glove, root)
        cuff = add(bpy.ops.mesh.primitive_torus_add, M["glove"], f"cuff_{side}", major_radius=0.085, minor_radius=0.04, location=tuple(hand - (hand - (mid + bend)).normalized() * 0.13))
        d = (hand - (mid + bend)).normalized()
        cuff.rotation_euler = d.to_track_quat("Z", "Y").to_euler()
        smooth(cuff, 180)
        parent(cuff, root)
        # thumb and fingers: enough to read as a waving or pointing glove
        up = d
        out = Vector((side, 0, 0))
        open_hand = (pose.get("wave") and side == 1)
        pointing = (pose.get("point") and side == -1)
        if open_hand:
            for i, a in enumerate((-32, -11, 11, 32)):
                dirv = (up * math.cos(math.radians(a)) + up.cross(Vector((0, 1, 0))).normalized() * math.sin(math.radians(a))).normalized()
                f = tube(f"finger_{side}_{i}", [tuple(hand + dirv * 0.08), tuple(hand + dirv * (0.25 if i in (1, 2) else 0.22))], 0.046, M["glove"])
                parent(f, root)
            th = (up.cross(Vector((0, 1, 0))).normalized() * -side * 1.0 + up * 0.25).normalized()
            f = tube(f"thumb_{side}", [tuple(hand + th * 0.06), tuple(hand + th * 0.19)], 0.048, M["glove"])
            parent(f, root)
        elif pointing:
            f = tube(f"finger_{side}", [tuple(hand + d * 0.08), tuple(hand + d * 0.3)], 0.048, M["glove"])
            parent(f, root)
            f = tube(f"thumb_{side}", [tuple(hand + Vector((0, 0, 0.06))), tuple(hand + Vector((0, 0, 0.18)) + d * 0.04)], 0.046, M["glove"])
            parent(f, root)
        else:
            th = (Vector((0, -0.6, 0.5)) + out * -0.3).normalized()
            f = add(bpy.ops.mesh.primitive_uv_sphere_add, M["glove"], f"thumb_{side}", segments=16, ring_count=8, radius=0.06, location=tuple(hand + th * 0.12))
            smooth(f, 180)
            parent(f, root)

    # --- legs and shoes ---
    for side, key in ((-1, "foot_l"), (1, "foot_r")):
        hip = on_body((side * 0.04, 0.0, z0 + 0.02))
        foot = Vector(pose[key])
        ankle = foot + Vector((0, 0, 0.13))
        mid = (hip + ankle) / 2
        slack = max(0.0, 0.55 - (hip - ankle).length)
        knee = mid + Vector((side * 0.03, -0.25 * slack / 0.3 - 0.02, 0))
        leg = tube(f"leg_{side}", [tuple(hip), tuple(hip + Vector((side * 0.08, 0, -0.08))), tuple(knee), tuple(ankle)], 0.058, M["limb"])
        parent(leg, root)
        pitch = math.radians(pose[f"foot_{'l' if side < 0 else 'r'}_rot"])
        shoe = add(bpy.ops.mesh.primitive_uv_sphere_add, M["shoe"], f"shoe_{side}", segments=32, ring_count=16, radius=0.17, location=(0, 0, 0))
        shoe.scale = (0.82, 1.5, 0.72)
        smooth(shoe, 180)
        sole = add(bpy.ops.mesh.primitive_cylinder_add, M["sole"], f"sole_{side}", vertices=48, radius=0.17, depth=0.07, location=(0, 0, -0.085))
        sole.scale = (0.86, 1.56, 1)
        bevel(sole, 0.03, 4)
        smooth(sole, 60)
        toe = add(bpy.ops.mesh.primitive_uv_sphere_add, M["sole"], f"toe_{side}", segments=24, ring_count=12, radius=0.1, location=(0, -0.19, -0.03))
        toe.scale = (1.1, 0.8, 0.75)
        smooth(toe, 180)
        holder = bpy.data.objects.new(f"foot_{side}", None)
        bpy.context.collection.objects.link(holder)
        for o in (shoe, sole, toe):
            parent(o, holder)
        holder.location = tuple(foot + Vector((0, -0.07, 0.12)))
        holder.rotation_euler = (pitch, 0, math.radians(-side * 8))
        parent(holder, root)

    root.rotation_euler[2] = math.radians(pose["turn"])
    return scene


def stage(scene, size, samples, side_view=False):
    scene.render.engine = "CYCLES"
    scene.cycles.samples = samples
    scene.cycles.use_denoising = True
    scene.cycles.device = "CPU"
    scene.render.film_transparent = True
    scene.render.resolution_x = size
    scene.render.resolution_y = size
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.view_settings.view_transform = "Standard"
    try:
        scene.view_settings.look = "None"
    except Exception:
        pass

    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs[0].default_value = (1, 1, 1, 1)
    world.node_tree.nodes["Background"].inputs[1].default_value = 0.32
    scene.world = world

    def light(name, loc, energy, size_, colour=(1, 1, 1)):
        d = bpy.data.lights.new(name, "AREA")
        d.energy = energy
        d.size = size_
        d.color = colour
        o = bpy.data.objects.new(name, d)
        o.location = loc
        bpy.context.collection.objects.link(o)
        o.rotation_euler = (Vector((0, 0, 1.4)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()

    light("key", (-3.2, -4.5, 5.0), 330, 4.0, (1, 0.97, 0.93))
    light("fill", (4.5, -3.0, 2.2), 90, 5.0, (0.9, 0.97, 1))
    light("rim", (2.0, 4.5, 4.5), 420, 3.0, (1, 1, 1))

    cam_d = bpy.data.cameras.new("cam")
    cam_d.lens = 85
    cam = bpy.data.objects.new("cam", cam_d)
    bpy.context.collection.objects.link(cam)
    target = Vector((0.1, 0, 1.5))
    if side_view:
        # Game sprites: seen from the side, running toward screen right.
        cam.location = (10.6, -3.0, 2.1)
    else:
        cam.location = (2.3, -10.6, 2.4)
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.camera = cam


def main():
    args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
    out = Path(args[0])
    out.mkdir(parents=True, exist_ok=True)
    size, samples, save_blend, side, names = 900, 96, False, False, []
    it = iter(args[1:])
    for a in it:
        if a == "--size":
            size = int(next(it))
        elif a == "--samples":
            samples = int(next(it))
        elif a == "--blend":
            save_blend = True
        elif a == "--side":
            side = True
        else:
            names.append(a)
    for name in names or ["hero"]:
        scene = build(name)
        stage(scene, size, samples, side)
        scene.render.filepath = str(out / f"{name}.png")
        bpy.ops.render.render(write_still=True)
        if save_blend:
            bpy.ops.wm.save_as_mainfile(filepath=str(out / f"mascot-{name}.blend"))


main()
