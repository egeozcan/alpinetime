import { Actions } from 'flummox';

export default class EstimationActions extends Actions {

    static addEstimation(estimation) {
        estimation.createdAt = Date.now();
        return estimation;
    }

    static removeEstimation(estimation) {
        estimation.isDeleted = true;
        return estimation;
    }

}