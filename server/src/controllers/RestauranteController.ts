import { Request, Response } from 'express';
import { Restaurante } from '@models/Restaurante';
import { Citi, Crud } from '../global'

export default class RestauranteController implements Crud {

    async create(request: Request, response: Response){
        const {nome, rua, tipodecomida} = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(nome, rua, tipodecomida);
        if(isAnyUndefined) return response.status(400).send();

        const newRestaurante = { nome, rua, tipodecomida };
        const {httpStatus, message} = await Citi.insertIntoDatabase(Restaurante, newRestaurante);

        return response.status(httpStatus).send({ message });
    }

    async get(request: Request, response: Response){
        const {httpStatus, values} = await Citi.getAll(Restaurante);
        return response.status(httpStatus).send(values);
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        const {value: restauranteFound, message } = await Citi.findByID(Restaurante, id); 
           
        if(!restauranteFound) return response.status(400).send({ message });

        const {httpStatus, messageFromDelete } = await Citi.deleteValue(Restaurante, restauranteFound);
        return response.status(httpStatus).send({ messageFromDelete });
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        const {nome, rua, tipodecomida } = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(nome, rua, tipodecomida, id);
        if(isAnyUndefined) return response.status(400).send();

        const restauranteWithUpdatedValues = { nome, rua, tipodecomida };

        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Restaurante, id, restauranteWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }

}