import React, { ReactNode } from "react";
import { Image, View, Heading, Button, VStack, IButtonProps, IHeadingProps, IImageProps, Text } from "native-base";
import { IImage } from "./Image";
import { Dimensions, ImageRequireSource, ImageURISource, StyleSheet, ViewStyle } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { SwiperFlatListProps } from "react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatListProps";

export const ReactNativeWelcomePage = (props: WelcomePageProps) => {
  const {
    onClose, data, swiperProps, buttonProps, titleProps, imageProps, titleText, buttonText,
    swiperStyle, containerStyle, imageContainerStyle
  } = props;
  const { width, height } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: { backgroundColor: "#4f46e5", height: height, flex: 1, ...containerStyle },
    swiper: { flex:1, ...swiperStyle },
    imageContainer: { width, justifyContent: "center", backgroundColor: "transparent", ...imageContainerStyle }
  });

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <SwiperFlatList autoplay
                        autoplayDelay={2}
                        autoplayLoop
                        showPagination
                        paginationStyleItem={{ marginTop: -80 }}
                        data={data}
                        index={0}
                        renderItem={({ item }: { item: IImage }) => {
                          let source: ImageRequireSource | ImageURISource;
                          return (
                            <View style={[styles.imageContainer]}>
                              <Image height={"100%"}
                                      borderBottomRadius={30}
                                      marginBottom={5}
                                      width={"100%"}
                                      source={item.image}
                                      alt={"Welcome!"}
                                      resizeMode="cover"
                                      {...imageProps} />
                            </View>
                          );
                        }}
                        {...swiperProps}
        />
        <VStack justifyContent="center" alignContent="center" alignItems="center" space={2}>
          <Button width={"80%"}
                  size="lg"
                  colorScheme="indigo"
                  bg="indigo.50"
                  borderRadius="20"
                  variant="outline"
                  {...buttonProps}
                  onPress={onClose}>
            {buttonText || <Text bold color="indigo.500" >Get started </Text>}
          </Button>
          <Heading size="sm" color="indigo.50" {...titleProps} >
            {titleText || "My new project"}
          </Heading>
        </VStack>
      </View>
    </View>
  );
};

export interface WelcomePageProps
{
  data: Array<IImage>;
  onClose: () => void;
  containerStyle?: ViewStyle;
  swiperStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageProps?: IImageProps;
  swiperProps?: SwiperFlatListProps<any>;
  buttonProps?: IButtonProps;
  titleProps?: IHeadingProps;
  titleText?: ReactNode;
  buttonText?: ReactNode;
}
