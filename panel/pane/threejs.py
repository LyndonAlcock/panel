import param
from .base import Pane
from ..util import lazy_load
from bokeh.model import Model
from typing import Optional

from bokeh.document import Document
from bokeh.model import Model
from pyviz_comms import Comm

class ThreeJS(Pane):


    data = None

    data_url = None

    def __init__(self, object=None, **params):
        super().__init__(**params)
    
    def _get_model(
        self, doc: Document, root: Optional[Model] = None,
        parent: Optional[Model] = None, comm: Optional[Comm] = None
    ) -> Model:
        ThreeJSPlot = lazy_load('panel.models.threejs','ThreeJSPlot',)

        return ThreeJSPlot


