export interface Gps {
    latitude: number;
    longitude: number;
    latitudeSymbol: string;
    longitudeSymbol: string;
}

export interface Plot {
    id: string;
    number: number;
    description: string;
    properties: string[];
    gps: Gps;
}

export interface Property {
    id: string;
    registerNumber: number;
    description: string;
    plots: string[];
    gps: Gps;
}
