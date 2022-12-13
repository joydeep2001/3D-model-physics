import { Canvas, useFrame } from "@react-three/fiber";
import {
  Physics,
  usePlane,
  useBox,
  Debug,
  useSphere,
  useCylinder,
} from "@react-three/cannon";

import { GizmoHelper, OrbitControls } from "@react-three/drei";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}

function Cyllinder(props) {
  const [ref, api] = useCylinder(() => ({
    mass: 60,
    position: [0, 0, 0],

    ...props,
  }));
  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[5, 10]} />
      <meshStandardMaterial color={"#ff0000"} />
    </mesh>
  );
}
function Sphere(props) {
  const [ref, api] = useSphere(() => ({
    mass: 7,
    position: [0, 7, 0],
    ...props,
  }));
  // useFrame(({ clock }) =>
  //   api.position.set(Math.sin(clock.getElapsedTime()) * 5, 1, 1)
  // );

  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}
function Cube(props) {
  const [ref, api] = useBox(() => ({
    mass: 6000,
    position: [0, 0, 0],
    args: [10, 2, 6],
    ...props,
  }));
  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry args={[10, 2, 6]} />
        <meshStandardMaterial color={"#ff0000"} />
      </mesh>
      <SmallCube />
    </group>
  );
}
function SmallCube(props) {
  const [ref, api] = useBox(() => ({
    mass: 60,
    position: [0, 0, 0],
    args: [2, 2, 2],
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"grey"} />
    </mesh>
  );
}
// function CubeComb(props) {
//   return (
//     <group onClick={() => console.log("clicked")}>
//       <Cube mass={2} pos={props.pos} />
//       <Cube mass={2} pos={[props.pos[0], props.pos[1] + 3, props.pos[2]]} />
//     </group>
//   );
// }

export default function Model() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas camera={{ position: [3, 30, -35], fov: 69 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Physics tolerance={0} iterations={50} broadphase={"SAP"}>
          <Debug color="blue" scale={1}>
            <color attach="background" args={["#ffffff"]} />
            <Plane />
            <Cube />
            <Sphere />
          </Debug>
        </Physics>
        <OrbitControls />
        <GizmoHelper />
      </Canvas>
    </div>
  );
}
