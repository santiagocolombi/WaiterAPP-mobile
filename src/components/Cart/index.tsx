import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Text } from "../Text";
import { Summary } from "./styles";
import { Item, ProductContainer, Actions ,Image, QuantityContainer, ProductDetails,TotalContainer} from "./styles";
import { formatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { Product } from "../../types/Product";

interface CartProps{
    cartItems: CartItem[];
    onAdd: (product : Product) => void;
}

export function Cart ({cartItems, onAdd}: CartProps){
    const total = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price
    }, 0)
    return(
        <>
       {cartItems.length > 0 && (
         <FlatList data={cartItems}
         style={{marginBottom: 20, maxHeight: 150}}
         keyExtractor={cartItems => cartItems.product._id}
         showsVerticalScrollIndicator={false}
         renderItem={({item: cartItem}) => (
             <Item>
                 <ProductContainer>
                     <Image source={{
                         uri:`http://192.168.1.4:3001/uploads/${cartItem.product.imagePath}`
                     }}/>
                     <QuantityContainer>
                         <Text size={14} color="#666">{cartItem.quantity}x</Text>
                     </QuantityContainer>
                     <ProductDetails>
                         <Text size={14} weight="600" >{cartItem.product.name}</Text>
                         <Text size={14} color="#666" style={{marginTop: 4}}>{formatCurrency(cartItem.product.price)}</Text>
                     </ProductDetails>
                 </ProductContainer>

                 <Actions>
                     <TouchableOpacity style={{marginRight: 24}}
                     onPress={() => onAdd(cartItem.product)}>
                         <PlusCircle>

                         </PlusCircle>
                     </TouchableOpacity>
                     <TouchableOpacity>
                         <MinusCircle>

                         </MinusCircle>
                     </TouchableOpacity>
                 </Actions>
             </Item>
         )}/>
       )}
        <Summary>
            <TotalContainer>
                {cartItems.length > 0 ? (
                    <>
                        <Text color="#666">Total</Text>
                        <Text size={20} weight="600">{formatCurrency(total)}</Text>
                    </>
                ) : (
                    <Text color="#999">Seu carrinho está vazio</Text>
                )}
            </TotalContainer>

            <Button onPress={() => alert('u.u')}
                disabled={cartItems.length === 0}>
                Conformar pedido
            </Button>
        </Summary>
        </>
    );
}
