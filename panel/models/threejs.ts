// See https://docs.bokeh.org/en/latest/docs/reference/models/layouts.html
import { HTMLBox, HTMLBoxView } from "./layout"

// See https://docs.bokeh.org/en/latest/docs/reference/core/properties.html
import * as p from "@bokehjs/core/properties"
import * as THREE from "three"

// The view of the Bokeh extension/ HTML element
// Defines how to render the model and react to changes or events
export class ThreeJSView extends HTMLBoxView {
    declare model: ThreeJSPlot
    protected _three_container: HTMLDivElement
    protected _three_renderer: THREE.WebGLRenderer
    protected _scene: THREE.Scene
    protected _camera: THREE.PerspectiveCamera

    override connect_signals(): void {
        super.connect_signals()

        const {data} = this.model.properties 
        // React to changes in model properties if needed
        this.on_change(data, () => {
            // todo
            this.invalidate_render()
        })
    }
    
    override render(): void {
        super.render()
        this._init_renderer()
        // Adjust renderer size to match the container
        this._three_renderer.setSize(this.el.clientWidth, this.el.clientHeight)
    

        // Create a simple geometry and add it to the scene
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        const cube = new THREE.Mesh(geometry, material)
        this._scene.add(cube)

        // Rendering the scene
        const animate = () => {
            requestAnimationFrame(animate)

            // Rotate the cube for animation
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01

            // Render the scene and camera
            this._three_renderer.render(this._scene, this._camera)
        }
        animate()
    }

    override invalidate_render(): void {
        super.invalidate_render()
    }

    _init_renderer(): void {
        super.initialize()
        this._three_container = document.createElement('div')
        this._three_renderer = new THREE.WebGLRenderer({ antialias: true })
        this._scene = new THREE.Scene()
        this._camera = new THREE.PerspectiveCamera(75, this.el.clientWidth / this.el.clientHeight, 0.1, 1000)
        this._camera.position.z = 5

        // Attach the renderer to the container
        this._three_container.appendChild(this._three_renderer.domElement)
        this.el.appendChild(this._three_container)
    }
}


// Define the Bokeh model for ThreeJS, corresponding to the Python model
export namespace ThreeJSPlot {
    export type Attrs = p.AttrsOf<Props>
    export type Props = HTMLBox.Props & {
        data: p.Property<string | ArrayBuffer | null>,
        data_url: p.Property<String|null>
    }
}

export interface ThreeJSPlot extends ThreeJSPlot.Attrs { }

export class ThreeJSPlot extends HTMLBox {
    declare properties: ThreeJSPlot.Props

    constructor(attrs?: Partial<ThreeJSPlot.Attrs>) {
        // const THREE = (window as any).three
        super(attrs)
    }

    static override __module__ = "panel.models.threejs"

    static {
        this.prototype.default_view = ThreeJSView

        this.define<ThreeJSPlot.Props>(({Bytes, Nullable, String}) => ({
            data: [Nullable(Bytes), null],
            data_url: [Nullable(String), null],
        }))
    }
}
