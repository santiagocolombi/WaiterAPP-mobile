import { categories } from "../../mocks/categories";
import { Category, Icon } from "./styles";
import { Text } from "../Text";
import { FlatList } from "react-native";
import { useState } from "react";
export function Categories(){
    const [selectedCategory, setSelectedCategory] = useState('');

function handleSelectCategory(categoryId: string) {
        setSelectedCategory(categoryId);{
            const category = selectedCategory === categoryId ? '' : categoryId;
        }

    }
    return (

        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingRight:24}}
         data={categories}
         keyExtractor={category =>  category._id}
         renderItem={({item: category}) => {
            const isSelected = selectedCategory === category._id
            return(
                <Category onPress={() =>  handleSelectCategory(category._id)} >
                <Icon>
                    <Text opacity={isSelected ? 1 :0.5}>{category.icon}</Text>
                </Icon>
                <Text size={14} weigth="600" opacity={isSelected ? 1 :0.5}>{category.name}</Text>
            </Category>
            )
         }}/>


    );

}
