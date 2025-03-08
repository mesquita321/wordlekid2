
import { Palavras } from './palavras';

export function PalavraSecreta() {
    const randomWord = Math.floor(Math.random() * Palavras.length);
    return Palavras[randomWord];
}



export function Despedida(name) {
    const options = [
        `Depois apanho-te à vinda em Peniche, ${name}`,
        `Ficas em Coimbra que já te apanho, ${name}`,
        `${name}, vais ficar em Lisboa umas horitas`,
        `Vou ter saudades tuas, ${name}! Aproveita a Figueira da Foz!`,
        `${name}, aproveita o por do sol!`,
        `Que tal uma viagem pelas falésias da Costa Vicentina, ${name}?`,
        `${name}, vai ter umas férias de sonho!`,
        `${name}, aproveita as vistas da Serra da Estrela!`,
        `${name}, já era! Mas pelo menos podes ver as ondas de Nazaré!`,
        `${name}, aproveita as vistas da Serra da Estrela!`,
        `${name} saiu... será que foi para o Gerês?`,
        `Vais a caminhar até Fátima ${name}?`,
        `A feira do chocolate é boa aí em Óbidos ${name}`,
        `O portinho da Arrabida é bem bonito ${name}`,
        `Ficas perto, come uma francesinha ${name}`,
        `${name}, lá se foi! Próxima paragem: Évora`,
    ];

    const randomOption = Math.floor(Math.random() * options.length);
    return options[randomOption];
}
        

        