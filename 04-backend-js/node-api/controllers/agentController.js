import { Agent } from '../models/Agent.js';
import { User } from '../models/User.js';

export const agentController = {

    getAll: async (req, res, next) => {

        // TODO aplicar filtros
        try {
            const agentes = await Agent
                .find()
                .populate('owner');

            // Sin DRM hariamos algo asi
            // for (let id = 0; id < agentes.length; id++) {
            //     const element = agentes[id];
            //     if (!element.owner) continue;
            //     const user = User.findById(element.owner);
            //     element.owner = user;
            // }



            res.status(200).json(agentes);
        } catch(ex) {
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }

    },

    add: async (req, res, next) => {
        const agent = new Agent({
            name: req.body.name,
            age: req.body.age,
            owner: req.body.owner
        });
        try {
            const savedAgent = await agent.save();
            res.status(201).json(savedAgent);
        } catch(ex) {
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
    },

}