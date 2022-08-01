import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
const dndEvents = ["dragenter", "dragover", "dragleave", "drop"];

function preventDefaults(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

class ThreeScene {
  static OBJECT_STORE_KEY = "3d-share-store-key";
  container: HTMLElement | null = null;
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  light = new AmbientLight(0x404040);
  renderer = new WebGLRenderer();
  scene = new Scene();
  controls = new OrbitControls(this.camera, this.renderer.domElement);

  constructor() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  init = (ele: HTMLElement) => {
    this.container = ele;
    // prevent default behavrio for drag events
    dndEvents.forEach((eventName) => {
      this.renderer.domElement.addEventListener(
        eventName,
        preventDefaults,
        false
      );
    });
    this.renderer.domElement.setAttribute("id", "webgl-canvas");
    ele.appendChild(this.renderer.domElement);
    this.attachEventHandlers();
    window.localStorage.setItem(ThreeScene.OBJECT_STORE_KEY, "[]");
    this.scene.add(this.light);
  };
  async loadModel(blobUrl: string) {
    const loader = new GLTFLoader();
    const model = await loader.loadAsync(blobUrl);
    this.scene.add(model.scene);
    //model.scene = new Vector3(0,0,0)
    console.debug("added to scene", model.scene);
    console.debug("current scene", this.scene);
  }

  dropHandler = (e: DragEvent) => {
    preventDefaults(e);
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    const urlObj = URL.createObjectURL(new Blob([file], { type: file.type }));
    const urlObjStore = JSON.parse(
      window.localStorage.getItem(ThreeScene.OBJECT_STORE_KEY) ?? "[]"
    ) as string[];
    urlObjStore.push(urlObj);
    window.localStorage.setItem(
      ThreeScene.OBJECT_STORE_KEY,
      JSON.stringify(urlObjStore)
    );
    this.loadModel(urlObj);
  };

  attachEventHandlers() {
    console.debug("attach events");
    if (!this.container) {
      console.warn("Need to call init() first.");
      return;
    }

    this.renderer.domElement.addEventListener("drop", this.dropHandler, {
      capture: true,
      passive: false,
    });
  }
  dispose() {
    console.debug("dispose");
    this.renderer.domElement.removeEventListener("drop", this.dropHandler);
  }
}

export default new ThreeScene();
