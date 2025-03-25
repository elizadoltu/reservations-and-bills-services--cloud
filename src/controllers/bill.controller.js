import Bill from "../models/Bill.js";

// Admin Only
export const createBill = async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();

        res.status(201).json(newBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// All for Admin, Client sees theirs
export const getBills = async (req, res) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { clientId: req.user._id };
        const bills = await Bill.find(filter);
        res.status(200).json({ bills });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Any bill for Admin, owning Client
export const getBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json({ bill });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin Only
export const updateBill = async (req, res) => {
    try {

        const updateBill = await Bill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updateBill) return res.status(404).json({ message: 'Bill not found' });
        res.status(200).json(updateBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin Only
export const deleteBill = async (req, res) => {
    try {

        const deleteBill = await Bill.findByIdAndDelete(req.params.id);
        if (!deleteBill) return res.status(404).json({ message: 'Bill not found' });

        res.status(200).json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



