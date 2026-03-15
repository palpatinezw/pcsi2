export type Subj = "math" | "phys" | "chem" 
export type DocType = "colle" | "other"

export type ColleDoc = {
    title: string;
    link: string;
    subject?: Subj;
    type?: DocType;
    dateCreated?: Date;
}