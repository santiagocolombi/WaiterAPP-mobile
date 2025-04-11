
import {Container, CategoriesContaier,Footer, MenuContaier,FooterContainer} from "./styles"
import { Header } from "../components/Header"
import { Categories } from "../components/Categories"
import { Menu } from "../components/Menu"
import { Button } from "../components/Button"
import { TableModal } from "../components/TableModal"
import { useState } from "react"
import { Cart } from "../components/Cart"
import { CartItem } from "../types/CartItem"
import { Product } from "../types/Product"

export function Main(){

    const [isTablaModalVisible, setIsTablaModalVisible] = useState(false)
    const [selectedTable, setSelectedTable] = useState('')
    const [cartItems , setCartItems] = useState<CartItem[]>([

    ])
    function handleSaveTable(table: string){
        setSelectedTable(table);


    }

    function handleCancelOrder(){
        setSelectedTable('')
    }
    function handleAddToCart(product: Product){
        if(!selectedTable){
            setIsTablaModalVisible(true)
        }
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);
            if(itemIndex < 0){
                return prevState.concat({
                    quantity: 1,
                    product,
                })
            }
            const newCartItems = [...prevState];
            const item = newCartItems[itemIndex];
            newCartItems[itemIndex]={
                ...item,
                quantity:  newCartItems[itemIndex].quantity + 1,
            };
            return newCartItems

        })


    }

    return (
        <>
        <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder} />

       <CategoriesContaier>
        <Categories />
       </CategoriesContaier>
       <MenuContaier>
        <Menu onAddToCart={handleAddToCart}/>
       </MenuContaier>

        </Container>
         <Footer>
            <FooterContainer>
                {!selectedTable && (
                <Button onPress= {() => setIsTablaModalVisible(true)}>
                    Novo Pedido
                </Button>
                )}

                {selectedTable && (
                    <Cart cartItems={cartItems}
                    onAdd={handleAddToCart}/>


                )}
            </FooterContainer>
         </Footer>
         <TableModal visible={isTablaModalVisible}
         onClose={() => setIsTablaModalVisible(false)}
         onSave={handleSaveTable}/>
        </>
    )
}
