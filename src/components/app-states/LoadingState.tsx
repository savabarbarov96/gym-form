
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  
  // Set up and animate Three.js scene
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      threeContainerRef.current.clientWidth, 
      threeContainerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    threeContainerRef.current.appendChild(renderer.domElement);
    
    // Create lighting
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xff6b35, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a group to hold dumbbells
    const dumbbellGroup = new THREE.Group();
    scene.add(dumbbellGroup);
    
    // Create dumbbell parts
    const createDumbbell = (angle: number) => {
      const group = new THREE.Group();
      
      // Middle bar
      const barGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
      const barMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.rotation.z = Math.PI / 2;
      group.add(bar);
      
      // Weights on ends
      const weightGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 16);
      const weightMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b35 });
      
      const weight1 = new THREE.Mesh(weightGeometry, weightMaterial);
      weight1.rotation.z = Math.PI / 2;
      weight1.position.x = -1;
      group.add(weight1);
      
      const weight2 = new THREE.Mesh(weightGeometry, weightMaterial);
      weight2.rotation.z = Math.PI / 2;
      weight2.position.x = 1;
      group.add(weight2);
      
      // Position the dumbbell
      group.rotation.y = angle;
      group.position.y = 0;
      group.position.z = 2.5;
      
      return group;
    };
    
    // Create multiple dumbbells
    const dumbbellCount = 5;
    const dumbbells: THREE.Group[] = [];
    
    for (let i = 0; i < dumbbellCount; i++) {
      const angle = (i / dumbbellCount) * Math.PI * 2;
      const dumbbell = createDumbbell(angle);
      dumbbellGroup.add(dumbbell);
      dumbbells.push(dumbbell);
    }
    
    // Create a pulsing sphere in the center
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff6b35,
      emissive: 0xff6b35,
      emissiveIntensity: 0.5
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Animation state
    let animationFrameId: number;
    let time = 0;
    
    // Animation loop
    const animate = () => {
      time += 0.01;
      
      // Rotate the dumbbell group
      dumbbellGroup.rotation.y += 0.005;
      
      // Make each dumbbell bob up and down
      dumbbells.forEach((dumbbell, i) => {
        const offset = i * (Math.PI / dumbbellCount);
        dumbbell.position.y = Math.sin(time + offset) * 0.3;
      });
      
      // Pulse the center sphere
      const scale = 1 + 0.2 * Math.sin(time * 3);
      sphere.scale.set(scale, scale, scale);
      
      // Render
      renderer.render(scene, camera);
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!threeContainerRef.current) return;
      
      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(
        threeContainerRef.current.clientWidth, 
        threeContainerRef.current.clientHeight
      );
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (threeContainerRef.current && renderer.domElement) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      sphereGeometry.dispose();
      sphereMaterial.dispose();
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8"
      >
        <div className="text-3xl font-bold mb-12">Creating Your Workout Program</div>
        
        <div className="mx-auto relative mb-12">
          <div 
            ref={threeContainerRef} 
            className="w-full h-[300px]"
          />
        </div>
        
        <div className="w-40 h-40 mx-auto relative">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              className="stroke-secondary" 
              strokeWidth="8" 
              fill="transparent" 
              r="46" 
              cx="50" 
              cy="50" 
            />
            <circle 
              className="stroke-orange" 
              strokeWidth="8" 
              fill="transparent" 
              r="46" 
              cx="50" 
              cy="50" 
              strokeDasharray="289.03px" 
              strokeDashoffset={289.03 - (289.03 * loadingProgress) / 100} 
              strokeLinecap="round" 
              style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold">
              {loadingProgress}%
            </div>
          </div>
        </div>
        
        <div className="text-muted-foreground mt-8 text-lg animate-pulse">
          Tailoring your personalized workout plan...
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingState;
