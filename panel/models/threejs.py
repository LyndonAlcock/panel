from .layout import HTMLBox


from bokeh.core.properties import Bytes, Nullable, Override, String

class ThreeJSPlot(HTMLBox):
    """
    
    """

    data = Nullable(Bytes, help="""The serialized file data""")

    data_url = Nullable(String, help="The data URL")

    height = Override(default=300)

    width = Override(default=300)