import { BaseEntity } from './../../shared';

export class Fournisseur implements BaseEntity {
    constructor(
        public id?: number,
        public matricule?: string,
        public nom?: string,
        public prenom?: string,
        public numNat?: string,
        public numEntrEtranger?: string,
        public rue?: string,
        public numero?: string,
        public codePostal?: string,
        public ville?: string,
        public country?: string,
        public rueEnvoi?: string,
        public numeroEnvoi?: string,
        public codePostalEnvoi?: string,
        public villeEnvoi?: string,
        public paysEnvoi?: string,
    ) {
    }
}
