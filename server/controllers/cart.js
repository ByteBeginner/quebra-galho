import Cart  from "../models/cart.js";

export const cartController = async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({error: "algum erro"})
    }
};
export const create = async (req, res) => {
    try {
        const { code, price} = req.body;
        const cart = await Cart.create({code, price})
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({error: "algum erro"})        
    }
}
    