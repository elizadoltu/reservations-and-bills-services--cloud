import Reservation from "../models/Reservation.js";

// Admin and Client
export const createReservation = async (req, res) => {
    try {
        const clientId = req.user.role === 'admin' ? req.body.clientId : req.user._id; 
        if (!clientId) {
            return res.status(400).json({ message: 'Client ID required' });
        }

        const newReservation = new Reservation({
            ...req.body,
            clientId
        });

        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Admin all, Client theirs
export const getReservations = async (req, res) => {
    try {
        const filter = req.user.role === 'admin' ? {} : { clientId: req.user._id };
        const reservations = await Reservation.find(filter);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Both Admin and Client
export const getReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!bill) return res.status(404).json({ message: 'Reservation not found' });
        res.status(200).json({ reservation });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Both Admin and Client only theirs
export const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: 'Reservation not found' });

        const updatedReervation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body, 
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedReervation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Both Admin and Client only theirs
export const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(400).json({ message: 'Reservation not found' });

        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
