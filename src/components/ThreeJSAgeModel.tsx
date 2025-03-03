
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeJSAgeModelProps {
  ageGroup: string;
}

const ThreeJSAgeModel: React.FC<ThreeJSAgeModelProps> = ({ ageGroup }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js components
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#121212');

    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a figure based on age group
    const model = new THREE.Group();
    modelRef.current = model;

    // Create a human-like figure with variations based on age
    const createHumanFigure = () => {
      // Clear existing model if any
      if (model.children.length > 0) {
        while (model.children.length > 0) {
          model.remove(model.children[0]);
        }
      }
      
      // Age-specific customizations
      let headScale = 1;
      let bodyHeight = 1;
      let bodyWidth = 0.6;
      let color = new THREE.Color('#ff4d00'); // Default orange color
      
      switch (ageGroup) {
        case "18-29":
          headScale = 1;
          bodyHeight = 1.8;
          bodyWidth = 0.6;
          break;
        case "30-39":
          headScale = 1;
          bodyHeight = 1.7;
          bodyWidth = 0.65;
          break;
        case "40-49":
          headScale = 0.95;
          bodyHeight = 1.65;
          bodyWidth = 0.7;
          break;
        case "50+":
          headScale = 0.9;
          bodyHeight = 1.6;
          bodyWidth = 0.75;
          break;
      }
      
      // Create head
      const headGeometry = new THREE.SphereGeometry(headScale * 0.5, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({ color });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = bodyHeight + 0.3;
      model.add(head);
      
      // Create body
      const bodyGeometry = new THREE.CylinderGeometry(
        bodyWidth / 2, 
        bodyWidth / 2, 
        bodyHeight, 
        32
      );
      const bodyMaterial = new THREE.MeshStandardMaterial({ color });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = bodyHeight / 2;
      model.add(body);
      
      // Create arms
      const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 32);
      const armMaterial = new THREE.MeshStandardMaterial({ color });
      
      // Left arm
      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-bodyWidth - 0.1, bodyHeight / 2, 0);
      leftArm.rotation.z = Math.PI / 4;
      model.add(leftArm);
      
      // Right arm
      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(bodyWidth + 0.1, bodyHeight / 2, 0);
      rightArm.rotation.z = -Math.PI / 4;
      model.add(rightArm);
      
      // Create legs
      const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32);
      const legMaterial = new THREE.MeshStandardMaterial({ color });
      
      // Left leg
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
      leftLeg.position.set(-bodyWidth / 3, -bodyHeight / 2 - 0.4, 0);
      model.add(leftLeg);
      
      // Right leg
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
      rightLeg.position.set(bodyWidth / 3, -bodyHeight / 2 - 0.4, 0);
      model.add(rightLeg);
      
      // Scale the model to fit the view
      model.scale.set(0.8, 0.8, 0.8);
      model.position.y = -0.8;
    };
    
    createHumanFigure();
    scene.add(model);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Animation loop
    let frame: number | null = null;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resizing
    const handleResize = () => {
      if (mountRef.current && cameraRef.current && rendererRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        rendererRef.current.setSize(width, height);
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Update the figure when age group changes
    createHumanFigure();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [ageGroup]);

  return <div ref={mountRef} className="w-full h-full min-h-[300px]" />;
};

export default ThreeJSAgeModel;
