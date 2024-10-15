from panel.pane import VTK, Image, ThreeJS
import panel as pn

pn.extension('vtk')

vtk_pane = VTK(
    'https://raw.githubusercontent.com/Kitware/vtk-js/master/Data/StanfordDragon.vtkjs',
    sizing_mode='stretch_width', height=400, enable_keybindings=True, orientation_widget=True
)



image_pane = Image('https://panel.holoviz.org/_static/logo_horizontal.png')

threejs_widget = ThreeJS()

pn.Column(threejs_widget).show()