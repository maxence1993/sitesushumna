"""Planning de la semaine en story (1080 x 1920 px), au format PowerPoint modifiable.
Tous les textes sont de vrais textes (polices Lora et Nunito, présentes dans Canva)."""
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

PX = 9525  # 1 px = 9525 EMU
SORTIE = '/tmp/claude-0/-home-user-sitesushumna/f1cc72a9-b492-5a25-bd5a-be78f038bb41/scratchpad/planning-story-modifiable.pptx'
LOGO = '/home/user/sitesushumna/graphisme/assets/logo-hd.png'

CREME = RGBColor(0xFB, 0xF6, 0xEC)
CARTE = RGBColor(0xFF, 0xFD, 0xF8)
OR = RGBColor(0xD9, 0xA7, 0x3B)
OR_TEXTE = RGBColor(0x87, 0x60, 0x1A)
BRUN = RGBColor(0x3D, 0x2A, 0x1B)
BRUN_DOUX = RGBColor(0x5C, 0x43, 0x30)
BORDURE = RGBColor(0xE6, 0xD5, 0xB5)

prs = Presentation()
prs.slide_width = Emu(1080 * PX)
prs.slide_height = Emu(1920 * PX)
diapo = prs.slides.add_slide(prs.slide_layouts[6])

fond = diapo.background.fill
fond.solid()
fond.fore_color.rgb = CREME


def px(v):
    return Emu(int(v * PX))


def forme(type_, x, y, w, h, remplissage, contour=None, epaisseur=0, rayon=None):
    s = diapo.shapes.add_shape(type_, px(x), px(y), px(w), px(h))
    s.fill.solid()
    s.fill.fore_color.rgb = remplissage
    if contour is None:
        s.line.fill.background()
    else:
        s.line.color.rgb = contour
        s.line.width = Pt(epaisseur)
    s.shadow.inherit = False
    if rayon is not None and type_ == MSO_SHAPE.ROUNDED_RECTANGLE:
        s.adjustments[0] = rayon
    return s


def texte(x, y, w, h, contenu, taille_px, couleur, police='Nunito', gras=False, italique=False,
          align=PP_ALIGN.LEFT, interligne=None, espacement=None):
    t = diapo.shapes.add_textbox(px(x), px(y), px(w), px(h))
    cadre = t.text_frame
    cadre.word_wrap = True
    cadre.margin_left = cadre.margin_right = cadre.margin_top = cadre.margin_bottom = 0
    cadre.vertical_anchor = MSO_ANCHOR.TOP
    p = cadre.paragraphs[0]
    p.alignment = align
    if interligne:
        p.line_spacing = interligne
    r = p.add_run()
    r.text = contenu
    f = r.font
    f.name = police
    f.size = Pt(taille_px * 0.75)
    f.bold = gras
    f.italic = italique
    f.color.rgb = couleur
    if espacement:
        r._r.get_or_add_rPr().set('spc', str(espacement))
    return t


# Décor : deux grands ronds crème dorés
forme(MSO_SHAPE.OVAL, 700, -180, 640, 640, RGBColor(0xF6, 0xE9, 0xC9))
forme(MSO_SHAPE.OVAL, -240, 1500, 560, 560, RGBColor(0xF6, 0xE9, 0xC9))

# En-tête
diapo.shapes.add_picture(LOGO, px(410), px(200), width=px(260))
texte(0, 330, 1080, 40, 'DISPONIBILITÉS', 26, OR_TEXTE, 'Nunito', gras=True, align=PP_ALIGN.CENTER, espacement=600)
texte(0, 372, 1080, 120, 'Cette semaine', 96, BRUN, 'Lora', gras=True, align=PP_ALIGN.CENTER)
texte(0, 510, 1080, 50, 'Du 2 au 8 novembre, pour réserver votre massage', 32, BRUN_DOUX, 'Nunito', align=PP_ALIGN.CENTER)

# Cartes des jours (à dupliquer ou supprimer selon la semaine)
JOURS = [
    ('Mardi 3 novembre', '15h15 – 17h30', 'Massage à réserver entre 15h15 et 17h30 (fin du massage avant 17h30).'),
    ('Mercredi 4 novembre', '12h30 – 18h00', 'Massage à réserver entre 12h30 et 18h (fin avant 18h), ou à 21h00.'),
    ('Vendredi 6 novembre', '11h00 – 21h00', 'Massage à réserver entre 11h et 21h (fin du massage avant 21h).'),
    ('Dimanche 8 novembre', '12h00 – 20h00', 'Massage à réserver entre 12h et 20h (fin du massage avant 20h).'),
]
y0, h, pas = 610, 204, 226
for i, (jour, heures, detail) in enumerate(JOURS):
    y = y0 + i * pas
    forme(MSO_SHAPE.ROUNDED_RECTANGLE, 90, y, 900, h, CARTE, contour=BORDURE, epaisseur=1.5, rayon=0.12)
    forme(MSO_SHAPE.ROUNDED_RECTANGLE, 90, y, 16, h, OR, rayon=0.5)
    texte(140, y + 22, 820, 54, jour, 38, BRUN, 'Lora', gras=True)
    texte(140, y + 78, 820, 70, heures, 52, OR_TEXTE, 'Nunito', gras=True)
    texte(140, y + 150, 820, 40, detail, 23, BRUN_DOUX, 'Nunito')

# Pied
texte(0, 1530, 1080, 44, 'Lundi, jeudi et samedi : fermé', 28, BRUN_DOUX, 'Nunito', align=PP_ALIGN.CENTER)
texte(0, 1590, 1080, 44, 'Réservez sur massage-sushumna.com', 32, OR_TEXTE, 'Nunito', gras=True, align=PP_ALIGN.CENTER)
texte(0, 1640, 1080, 44, '07 50 46 01 10', 32, OR_TEXTE, 'Nunito', gras=True, align=PP_ALIGN.CENTER)

prs.save(SORTIE)
print('ok', SORTIE)
