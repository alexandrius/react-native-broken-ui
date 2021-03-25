import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withSpring,
   withTiming,
   interpolate,
} from "react-native-reanimated";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function HingeInput({
   style,
   value,
   onChangeText,
   placeholder,
   zIndex,
   inputStyle,
   startRotation = 0,
   hingePosition,
   onFocus,
   paddingHorizontal,
}) {
   const width = useSharedValue(0);
   const height = useSharedValue(0);
   const ogY = useSharedValue(0);
   const inputWidth = useSharedValue(0);

   const rotation = useSharedValue(startRotation);
   const slideAnimation = useSharedValue(0);
   const [dummy, setDummy] = useState(false);

   const direction = hingePosition === "right" ? -1 : 1;

   useEffect(() => {
      //rotate by 1 degree on every letter
      if (value.length < 10) {
         rotation.value = withSpring(-value.length * direction + startRotation);
      } else if (value.length < 20) {
         rotation.value = withSpring(-20 * direction);
      } else {
         rotation.value = withSpring(-90 * direction);
      }

      //start slide in
      if (hingePosition === "right" && value.length) {
         slideAnimation.value = withTiming(1, { duration: 3000 });
      }
   }, [value]);

   useEffect(() => {
      setDummy(!dummy);
   }, []);

   function getRotationWithAnchor(width, height, rotation) {
      "worklet";
      return [
         { translateX: (width / 2) * direction },
         // { translateY: -height / 2 },
         { rotate: rotation + "deg" },
         //  { translateY: height / 2 },
         { translateX: -(width / 2) * direction },
      ];
   }

   const rotationStyle = useAnimatedStyle(() => {
      // this not working in reanimated-rc-0 atm
      // const inputWidth = measure(aRef).width;
      return {
         transform: getRotationWithAnchor(width.value, 0, rotation.value),
      };
   });

   const animatedInputStyle = useAnimatedStyle(() => {
      return {
         transform: [
            {
               //interpolate before reaching end of the input  
               translateX: interpolate(
                  slideAnimation.value,
                  [0, 1],
                  [0, width.value - inputWidth.value - paddingHorizontal * 2]
               ),
            },
         ],
      };
   });

   return (
      <Animated.View
         onLayout={({ nativeEvent: { layout } }) => {
            if (!width.value && layout.width) {
               width.value = layout.width;
               height.value = layout.height;
               ogY.value = layout.y;
            }
         }}
         style={[{ zIndex, paddingHorizontal }, style, rotationStyle]}
      >
         <AnimatedTextInput
            placeholder={placeholder}
            style={[inputStyle, animatedInputStyle]}
            autoCapitalize="none"
            value={value}
            onFocus={onFocus}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
            onContentSizeChange={({
               nativeEvent: {
                  contentSize: { width },
               },
            }) => {
               inputWidth.value = width;
            }}
         />
      </Animated.View>
   );
}
