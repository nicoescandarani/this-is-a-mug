import { NgtSobaOrbitControls } from '@angular-three/soba/controls';
import { NgtGLTFLoaderService } from '@angular-three/soba/loaders';
import { Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera } from 'three';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mug',
  templateUrl: './mug.component.html',
  styleUrls: ['./mug.component.scss']
})
export class MugComponent implements OnInit {
  @Input()
  set color(value: string) {
    this.appluColorToMaterial(value);
    this.#color = value;
  }

  @Input() height: number | null = 0;

  #color = '';
  cup$ = this.ngtGLTFLoader.load('assets/models/mug.glb');
  cupMaterial: MeshStandardMaterial | undefined;
  cupInnerMaterial: MeshStandardMaterial | undefined;

  constructor(private ngtGLTFLoader: NgtGLTFLoaderService) { }

  ngOnInit(): void { }

  cupReady(object: Object3D) {
    this.cupMaterial = <MeshStandardMaterial>(<Mesh>object.getObjectByName('Object_2')).material;
    this.cupInnerMaterial = <MeshStandardMaterial>(<Mesh>object.getObjectByName('Object_3')).material;
    this.appluColorToMaterial(this.#color);
  }

  setInitialMain(controls: NgtSobaOrbitControls): void {
    const orbitControls = controls.controls;
    const camera = orbitControls.object as PerspectiveCamera;
    camera.zoom = 9;
    camera.position.setY(1.8);
    camera.position.setX(-10);
    orbitControls.enableZoom = false;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 1;
  }

  appluColorToMaterial(color: string) {
    if (this.cupMaterial) {
      this.cupMaterial.color.setHex(parseInt(color.substring(1), 16));
    }
  }
}
