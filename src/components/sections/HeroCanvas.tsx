'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMotion } from '@/hooks/useMotion';
import { SKILLS, SKILL_CONNECTIONS } from '@/data/portfolio';

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { shouldAnimate } = useMotion();

  useEffect(() => {
  if (!mountRef.current) return;
  const mount = mountRef.current;

  // Wait for container to have real dimensions
  const width = mount.offsetWidth || window.innerWidth;
  const height = mount.offsetHeight || 300;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  // Make canvas fill container
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  // Node positions
  const positions = [
    [-2.5, 1.2, 0],
    [-1.2, 2.0, 0],
    [-0.2, 1.5, 0],
    [1.5, 1.8, 0],
    [2.5, 0.8, 0],
    [2.0, -0.5, 0],
    [0.5, 2.5, 0],
    [3.0, -0.2, 0],
    [-1.8, 0.2, 0],
  ] as [number, number, number][];

  // Connection lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.2,
  });

  SKILL_CONNECTIONS.forEach(([a, b]) => {
    const points = [
      new THREE.Vector3(...positions[a]),
      new THREE.Vector3(...positions[b]),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.Line(geometry, lineMaterial));
  });

  // Nodes
  const nodeMaterial = new THREE.PointsMaterial({
    color: 0x00d4ff,
    size: 0.15,
    sizeAttenuation: true,
  });

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions.flat(), 3)
  );
  const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
  scene.add(nodes);

  // Background stars
  const starGeometry = new THREE.BufferGeometry();
  const starVertices: number[] = [];
  for (let i = 0; i < 200; i++) {
    starVertices.push(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 - 2
    );
  }
  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  scene.add(new THREE.Points(starGeometry, new THREE.PointsMaterial({
    color: 0xf0f4ff,
    size: 0.03,
    transparent: true,
    opacity: 0.6,
  })));

  // Raycaster + tooltip
  const raycaster = new THREE.Raycaster();
  raycaster.params.Points!.threshold = 0.15;
  const mouse = new THREE.Vector2();
  let hoveredIndex = -1;

  const tooltip = document.createElement('div');
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(7, 13, 26, 0.95);
    border: 1px solid rgba(0, 212, 255, 0.6);
    color: #F0F4FF;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-family: var(--font-mono);
    pointer-events: none;
    opacity: 0;
    transition: opacity 150ms;
    white-space: nowrap;
    z-index: 10;
  `;
  mount.appendChild(tooltip);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = mount.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(nodes);

    if (intersects.length > 0) {
      const idx = intersects[0].index ?? -1;
      if (idx !== hoveredIndex) {
        hoveredIndex = idx;
        tooltip.textContent = `${SKILLS[idx].name} · ${SKILLS[idx].detail}`;
        tooltip.style.opacity = '1';
      }
      tooltip.style.left = `${e.clientX - rect.left + 12}px`;
      tooltip.style.top = `${e.clientY - rect.top - 10}px`;
    } else {
      hoveredIndex = -1;
      tooltip.style.opacity = '0';
    }
  };

  mount.addEventListener('mousemove', handleMouseMove);

  // ResizeObserver — more reliable than window resize on mobile
  const resizeObserver = new ResizeObserver(() => {
    const w = mount.offsetWidth;
    const h = mount.offsetHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObserver.observe(mount);

  // Animation
  let animationId: number;
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    if (shouldAnimate) {
      nodes.rotation.y += 0.0008;
      nodes.rotation.x += 0.0003;
    }
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(animationId);
    mount.removeEventListener('mousemove', handleMouseMove);
    resizeObserver.disconnect();
    if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    if (mount.contains(tooltip)) mount.removeChild(tooltip);
    renderer.dispose();
  };
}, [shouldAnimate]);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      role="img"
      aria-label="Interactive constellation map of Saurav's skills — each star represents a skill, hover to explore"
    />
  );
}