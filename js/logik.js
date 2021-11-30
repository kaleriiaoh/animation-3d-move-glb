    // скролл на странице при загрузке
    document.body.style.overflow = "hidden";


    // блок импортов
    import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
    import {
        OrbitControls
    } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
    import {
        GLTFLoader
    } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js';

    // блок переменных
    var root5;
    let mixer5;


    // scene - создаем сцену
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
    const canvas = document.querySelector('#canvas');
    const logotip = document.querySelector('.logotip');

     // camera - создаем камеру
     const fov = 45;
     const aspect = window.innerWidth / window.innerHeight; // the canvas default
     const near = 0.01;
     const far = 1000;
     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
     camera.position.set(0, 0, 0.3);
     camera.lookAt(0, 0, 0);
 
     // light - включаем свет
     var spotLight = new THREE.SpotLight(0xffffff, 10);
     spotLight.position.set(200, 200, 200);
     scene.add(spotLight);
 
     // GLTF loader - загружаем модель 
     const loader = new GLTFLoader();
  
 
     loader.load('/model/all/WeavingFlag.glb', (gltf5) => {
         root5 = gltf5.scene;
         root5.scale.set(0.1, 0.1, 0.1);
         root5.position.z = 0;
         root5.position.x = 0;
         root5.position.y = 0;
         root5.rotation.y = 0;
         mixer5 = new THREE.AnimationMixer(root5); // у AnimationMixer есть другие методы, я заменила ниже .setTime на .update как поняла я именно тут и ниже мы тянем анимку
         mixer5.clipAction(gltf5.animations[0]).play();
         scene.add(root5);
 
     });
 
     // render - настраиваем рендер
     const renderer = new THREE.WebGLRenderer({
         canvas,
         logarithmicDepthBuffer: true,
     });
     renderer.setSize(window.innerWidth, window.innerHeight);
     document.body.appendChild(renderer.domElement);
 
     // animation - настраиваем анимацию сцены
     // тут  ниже я почистила все лишнее и остаила ток скорость для  mixer5.update(0.01);
     const animate = function() {
         requestAnimationFrame(animate);
 
         if(mixer5) {
            mixer5.update(0.01); // тут заменила .setTime на .update и подобрала скорость
         }
         
         renderer.render(scene, camera);
     };
     animate()












    // // mobile scroll
    // canvas.addEventListener('touchstart', handleTouchStart, false);
    // canvas.addEventListener('touchmove', handleTouchMove, false);

    // var xDown = null;
    // var yDown = null;

    // function getTouches(evt) {
    //     return evt.touches || evt.originalEvent.touches;
    // }

    // function handleTouchStart(evt) {
    //     const firstTouch = getTouches(evt)[0];
    //     xDown = firstTouch.clientX;
    //     yDown = firstTouch.clientY;
    // };

    // function handleTouchMove(evt) {
    //     if (!xDown || !yDown) {
    //         return;
    //     }

    //     var xUp = evt.touches[0].clientX;
    //     var yUp = evt.touches[0].clientY;

    //     var xDiff = xDown - xUp;
    //     var yDiff = yDown - yUp;

    //     if (Math.abs(xDiff) > Math.abs(yDiff)) {
    //         /*most significant*/
    //         if (xDiff > 0) {
    //             /* left swipe */

    //         } else {
    //             /* right swipe */

    //         }
    //     } else {
    //         if (yDiff > 0) {
    //             /* up swipe */
    //             scrollSceneDown();
    //         } else {
    //             /* down swipe */
    //             scrollSceneUp();
    //         }
    //     }
    //     /* reset values */
    //     xDown = null;
    //     yDown = null;
    // };




   
    // setTimeout(animate, 100);




    // получаем координаты курсора
    // function getMousePos(e) {
    //     return {
    //         x: e.clientX,
    //         y: e.clientY
    //     };

    // }


    // // вращение модели в зависимости от курсора конструктор
    // function moveJoint(mouse, joint, degreeLimit) {
    //     let degrees = getMouseDegrees(mouse.x, mouse.y, degreeLimit);
    //     joint.rotation.y = THREE.Math.degToRad(degrees.x);
    //     joint.rotation.x = THREE.Math.degToRad(degrees.y);
     
    //     // console.log('joint.rotation.y: ' + joint.rotation.y, 'joint.rotation.x: ' + joint.rotation.x);
    // }
    

    //  // вращение модели в зависимости от акселерометра конструктор
    // function moveAxel(x, y, joint) {
    //     joint.rotation.y = THREE.Math.degToRad(y/2);
    //     joint.rotation.x = THREE.Math.degToRad(x/2);
    //     // console.log('joint.rotation.y: ' + joint.rotation.y, 'joint.rotation.x: ' + joint.rotation.x);
    // }


    // // логика ограничения вращения модели
    // function getMouseDegrees(x, y, degreeLimit) {
    //     let dx = 0,
    //         dy = 0,
    //         xdiff,
    //         xPercentage,
    //         ydiff,
    //         yPercentage;

    //     let w = {
    //         x: window.innerWidth,
    //         y: window.innerHeight
    //     };

    //     // Left (Rotates neck left between 0 and -degreeLimit)

    //     // 1. If cursor is in the left half of screen
    //     if (x <= w.x / 2) {
    //         // 2. Get the difference between middle of screen and cursor position
    //         xdiff = w.x / 2 - x;
    //         // 3. Find the percentage of that difference (percentage toward edge of screen)
    //         xPercentage = (xdiff / (w.x / 2)) * 100;
    //         // 4. Convert that to a percentage of the maximum rotation we allow for the neck
    //         dx = ((degreeLimit * xPercentage) / 100) * -1;
    //     }
    //     // Right (Rotates neck right between 0 and degreeLimit)
    //     if (x >= w.x / 2) {
    //         xdiff = x - w.x / 2;
    //         xPercentage = (xdiff / (w.x / 2)) * 100;
    //         dx = (degreeLimit * xPercentage) / 100;
    //     }
    //     // Up (Rotates neck up between 0 and -degreeLimit)
    //     if (y <= w.y / 2) {
    //         ydiff = w.y / 2 - y;
    //         yPercentage = (ydiff / (w.y / 2)) * 100;
    //         // Note that I cut degreeLimit in half when she looks up
    //         dy = (((degreeLimit * 0.5) * yPercentage) / 100) * -1;
    //     }

    //     // Down (Rotates neck down between 0 and degreeLimit)
    //     if (y >= w.y / 2) {
    //         ydiff = y - w.y / 2;
    //         yPercentage = (ydiff / (w.y / 2)) * 100;
    //         dy = (degreeLimit * yPercentage) / 100;
    //     }
    //     return {
    //         x: dx,
    //         y: dy
    //     };
    // }