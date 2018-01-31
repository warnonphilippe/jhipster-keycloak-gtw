import { BaseEntity } from './../../shared';

export class BonCommande implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public numero?: number,
        public type?: string,
        public statut?: string,
        public fournisseur?: BaseEntity,
    ) {
    }
}
