import { dataReducer } from "../context/DataContext/data-reducer";

describe("testing cart", () => {
    it("should add to cart", () => {
        const initialState = {
            cartItems: [],
        }
        const item1 = {
            _id: "1234",
            name: "Testing product",
            price: 500
        }

        let action = {
            type: "ADD_TO_CART",
            payload: item1
        }
        const state = dataReducer(initialState, action)
        expect(state).toEqual({
            cartItems: [{
                _id: "1234",
                name: "Testing product",
                price: 500,
                quantity: 1
            }]
        })
    })

    it("should remove from cart", () => {
        const initialState = {
            cartItems: [
                {
                    _id: "1234",
                    name: "Testing product",
                    price: 500,
                    quantity: 1
                },
                {
                    _id: "5678",
                    name: "Product Testing",
                    price: 200,
                    quantity: 1
                }
            ]
        }
        let action = {
            type: "REMOVE_FROM_CART",
            payload: "5678"
        }
        const state = dataReducer(initialState, action)
        expect(state).toEqual({
            cartItems: [{
                _id: "1234",
                name: "Testing product",
                price: 500,
                quantity: 1
            }]
        })
    })

    it("should increase quantity by 1", () => {
        const initialState = {
            cartItems: [{
                _id: "1234",
                name: "Testing product",
                price: 500,
                quantity: 1
            }]
        }
        let action = {
            type: "INC_QNT",
            payload: "1234"
        }
        const state = dataReducer(initialState, action);

        expect(state).toEqual({
            cartItems: [{
                _id: "1234",
                name: "Testing product",
                price: 500,
                quantity: 2
            }]
        })
    })

    it("should decrese quantity by 1", () => {
        const initialState = {
            cartItems: [{
                _id: "12",
                name: "Product 1",
                price: 800,
                quantity: 2
            }]
        }
        const action = {
            type: "DEC_QNT",
            payload: "12"
        }
        const state = dataReducer(initialState, action);

        expect(state).toEqual({
            cartItems: [{
                _id: "12",
                name: "Product 1",
                price: 800,
                quantity: 1
            }]
        })
    })
})

describe("testing wishlist", () => {
    it("should add item to wishlist", () => {
        const initialState = {
            wishListItems: []
        }

        const item = {
            _id: "987",
            name: "Wishlist product",
            price: "200"
        }

        let action = {
            type: "ADD_TO_WISHLIST",
            payload: item
        }
        const state = dataReducer(initialState, action);

        expect(state).toEqual({
            wishListItems: [{
                _id: "987",
                name: "Wishlist product",
                price: "200"
            }]
        })
    })

    it("should remove from wishlist", () => {
        const initialState = {
            wishListItems: [{
                _id: "987",
                name: "Wishlist product",
                price: "200"
            }]
        }
        let action = {
            type: "REMOVE_FROM_WISHLIST",
            payload: "987"
        }

        const state = dataReducer(initialState, action);

        expect(state).toEqual({
            wishListItems: []
        })
    })
})