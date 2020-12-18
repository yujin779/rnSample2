import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import Example from "./components/Example";
import styles from "./styles";

const Box = (props) => {
  // hooks
  const mesh2 = useRef();
  // [変数名,変数を変更する関数名] = useState(初期値);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // 回転させる
  useFrame(() => {
    mesh2.current.rotation.x = mesh2.current.rotation.y += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh2}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      {/* ジオメトリ(形)とマテリアル(色など)をメッシュの中にいれる */}
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const App = () => {
  return (
    // <View style={{ width: size.width, height: size.height }}>
    //   <Text>
    //     {size.width}px / {size.height}px
    //   </Text>
    // </View>
    <Canvas
      style={{
        background: "#324444"
      }}
    >
      {/* 環境光源 */}
      <ambientLight intensity={0.5} />
      {/* スポットライト */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      {/* ポイントライト */}
      <pointLight position={[-10, -10, -10]} />
      {/* 上部にあるfunction Boxを実体化 */}
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default App;
