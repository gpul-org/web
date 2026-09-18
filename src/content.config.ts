import {
	authorsDefinition as authors,
	definition as eventos,
} from "./content/event";
import { definition as novas } from "./content/nova";
import { definition as directiva } from "./content/directive";

// Dejo history para recordar cuando se añada la sección de historia de GPUL
// en /sobre-nos debe primero descomentarse de aquí.
export const collections = { eventos, novas, directiva, authors /*history*/ };
