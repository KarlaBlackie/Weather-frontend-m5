/**
 * Clase 1: WeatherApiClient
 * Responsabilidad: Obtener datos de Open-Meteo
 */

class WeatherApiClient {
    constructor() {
        this.baseUrl = "https://api.open-meteo.com/v1/forecast?";
    }

    async getWeatherData(lat, lon) {
        try {
            // Pedimos clima actual y pronóstico de 7 días
            const url = `${this.baseUrl}latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error al conectar con la API");
            return await response.json();
        } catch(error) {
            console.error("Fallo en la API", error);
            return null;
        }
    }
}

/**
 * Clase 2: Clase principal (WeatherApp)
 * Responsabilidad: Lógica de negocio, cálculo y gestión de datos
 */

class WeatherApp {

    constructor() {
        this.apiClient = new WeatherApiClient();
        this.ciudades = [
            { id: 1, nombre: "New York", lat:40.71, lon: -74.00, img:"assets/img/central_park.png",mensaje: "En la nieve, practica gratitud por el calor de tu hogar y corazón."},
            { id: 2, nombre: "Tokio", lat: 35.68, lon: 139.69, img: "assets/img/tokio.jpeg", mensaje: "Momento perfecto para respiración consciente y dejar que tus preocupaciones se disuelvan con cada gota."},
            { id: 3, nombre: "Buenos Aires", lat: -34.60, lon: -58.38, img: "assets/img/buenos_aires.jpeg",mensaje: "Energía vibrante para conectar con tu confianza interior y brillar como el sol."},
            { id: 4, nombre: "Madrid", lat: 40.41, lon: -3.70, img: "assets/img/madrid.png", mensaje: "El sol recarga energía. Camina 25 minutos al aire libre sin auriculares para conectar."},
            { id: 5, nombre: "Londres", lat: 51.50, lon: -0.12, img: "assets/img/londres.png", mensaje: "Días grises piden calor interno.Chocolate caliente más diario de gratitud."},
            { id: 6, nombre: "Río de Janeiro", lat: -22.90, lon: -43.17, img: "assets/img/rio_de_janeiro.png", mensaje: "Luz, mar y energía.Permite que el sol de Río te recuerde que mereces disfrutar, jugar y cuidar tu bienestar interior."},
            { id: 7, nombre: "Ciudad de México", lat: 19.43, lon: -99.13, img: "assets/img/ciudad_de_mexico.png",mensaje: "La neblina te invita a ir más despacio.Aún si afuera todo se ve borroso, puedes respirar profundo y hacer claridad dentro de ti, paso a paso."},
            { id: 8, nombre: "Sídney", lat: -33.86, lon: 151.20,  img: "assets/img/sidney.png", mensaje: "El sol de Sidney sale sobre el puerto, recordándote; cada día cura tu corazón."},
            { id: 9, nombre: "Santiago", lat: -33.44, lon: -70.66,  img: "assets/img/santiago.png", mensaje: "Este día es una invitación a la calma interior, así como el cielo se libera de nubes, puedes aprovechar esta luz para aclarar tus pensamientos, soltar preocupaciones y enfocarte en lo que hoy sí depende de ti."},
            { id: 10, nombre: "Paris", lat: 48.85, lon: 2.35,img: "assets/img/paris.jpeg", mensaje: "Acepta tus propios cambios. Hay belleza y fortaleza en la calma.Mantente firme, como esta icónica torre, mientras abrazas el ciclo de renovación en tu vida emocional."},
            { id:11, nombre: "Bogotá", lat: 4.60, lon: -74.08,  img: "assets/img/bogota.jpeg", mensaje: "Al igual que una tormenta, el granizo es temporal.La clave no es evitar que caiga, sino tener la certeza de que pasará.Abrígate, busca refugio y mantente firme.Después de la granizada siempre regresa la calma."},
            { id:12, nombre: "Lima", lat: -12.04, lon: -77.03, img: "assets/img/lima.jpeg",  mensaje: "Permítete fluir, no luches contra la ola de la tristeza o el estrés, obsérvala, respira y confía en que, inevitablemente, la calma regresará."}

        ];
    }

    // Inicializa carga de tarjetas

    async init() {
        await this.crearTarjetas()
    }

    // Traduce códigos de Open_Meteo a estados e íconos

    getClimaInfo(code) {
        if (code === 0) return {estado:"Despejado", icono: '<i class="bi bi-brightness-high"></i>'};
        if (code <= 3) return {estado: "Nublado", icono: '<i class="bi bi-cloud-fill"></i>'};
        if (code >= 51 && code <= 67) return {estado: "Lluvioso", icono: '<i class="bi bi-cloud-drizzle"></i>'};
        if (code >= 71 && code <= 77) return {estado: "Nevado", icono: '<i class="bi bi-snow3"></i>'};
        return { estado: "Variable", icono: '<i class="bi bi-cloud-sun"></i>'};
    }
    
    
    async crearTarjetas() {
        const grilla = document.getElementById('fila-tarjetas');
        if (!grilla) return;
       

        grilla.innerHTML = ' <div class="text-center w-100"><h3>Cargando datos climáticos...</h3></div>';

        let cardsHtml ="";

        // Usamos un bucle for ... of para manejar la asincronía correctamente
        for (const ciudad of this.ciudades) {
            const data = await this.apiClient.getWeatherData(ciudad.lat, ciudad.lon);
            const clima = this.getClimaInfo(data?.current_weather?.weathercode || 0);
            const temp = data ? Math.round(data.current_weather.temperature) : "--";

            cardsHtml += `
                <article class="col">
                    <div class="weather-card" onclick="girarTarjeta(this)">
                        <div class="weather-card__container">
                            <div class="weather-card__front">
                                <img src="${ciudad.img}" class="weather-card__img" alt="${ciudad.nombre}">
                                <div class="weather-card__overlay">
                                    <h2 class="weather-card__title">${ciudad.nombre}</h2>
                                        <div class="weather-card__info">
                                            ${clima.icono}
                                            <span class="weather-card__temp">${temp}</span>
                                            <span class="weather-card__status">${clima.estado}</span>
                                        </div>
                                        <button class="weather-card__button mt-2"
                                            onclick="event.stopPropagation();app.seleccionarYMostrar(${ciudad.id})">
                                        Ver más
                                        </button>
                                    </div>
                                </div>

                                <div class="weather-card__back d-flex flex-column justify-content-center p-3 text-center">
                                    <p class="weather-card__label fw-bold">Consejo emocional:</p> 
                                    <p class="weather-card__message fst-italic">${ciudad.mensaje}</p>
                                </div>
                            </div>
                        </div>
                </article>`;
        }
        grilla.innerHTML = cardsHtml;
    }
       
    async seleccionarYMostrar(id) {
        const ciudad =this.ciudades.find(c => c.id === id);
        const data = await this.apiClient.getWeatherData(ciudad.lat, ciudad.lon);
        if (!data) return;

        const stats = this.calcularEstadisticas(data.daily);

        document.getElementById('vista-home').classList.add('d-none');
        document.getElementById('seccion-detalle').classList.remove('d-none');


        const contenedor= document.getElementById('contenido-detalle-dinamico');
        const climaActual = this.getClimaInfo(data.current_weather.weathercode);

        // Generar pronóstico de 7 días basado en la API

        let pronosticoHtml = data.daily.time.map((fecha, i) => {
            const info = this.getClimaInfo(data.daily.weathercode[i]);
            const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
            const diaNombre = diasSemana[new Date(fecha + "T00:00:00").getDay()];
            return `
                <div class="col">
                    <div class="forecast-item h-100 border-0 shadow-sm bg-light text-center p-2">
                        <p class="forecast-item__day fw-bold mb-1 text-primary">${diaNombre}</p>
                        <p class="forecast-item__temp small mb-1">${Math.round(data.daily.temperature_2m_min[i])}° / ${Math.round(data.daily.temperature_2m_max[i])}°</p>
                        <p class="forecast-item__status text-muted" style="font-size: 0.7rem;">${info.estado}</p>
                    </div>
                </div>`; 
        }).join('');


   
        contenedor.innerHTML = `
            <div class="detail-content bg-white p-4 shadow rounded">
                <div class="row g-4">
                    <div class="col-md-5 text-center border-end">
                        <img src="${ciudad.img}" class="detail-content__img img-fluid rounded shadow mb-3" alt="${ciudad.nombre}">
                        <h2 class="detail-content__city h2 fw-bold">${ciudad.nombre}</h2>
                        <div class="detail-content__display display-4">${climaActual.icono} ${Math.round(data.current_weather.temperature)}°C</div>
                        <p class="detail-content__badge badge bg-info text-dark">${climaActual.estado}</p>
                        <p class="detail-content__message fst-italic mt-3">${ciudad.mensaje}</p>
                        <div class="alert ${stats.claseAlerta} mt-3">
                            <strong>Alerta:</strong> ${stats.alerta}
                        </div>
                    </div>

                    <div class="col-md-7 detail-content__secondary">
                        <h4 class="detail-content__subtitle fw-bold mb-3"><i class="bi bi-calendar3 me-2"></i>Pronóstico de la semana</h4>
                        <div class="row row-cols-4 row-cols-lg-7 g-2 mb-4">     
                            ${pronosticoHtml}
                        </div>

                        <div class="stats-section bg-light p-3 rounded border">
                            <h5 class="fw-bold text-primary">Análisis semanal</h5>
                            <div class="d-flex justify-content-between mb-2">
                                <span><strong>Mín Semanal :</strong> ${stats.minSemanal}°C</span>
                                <span><strong>Máx Semanal:</strong> ${stats.maxSemanal}°C</span>
                                <span><strong>Promedio:</strong> ${stats.promedio}°C</span>
                            </div>
                            <p class="mb-1"><strong>Días soleados:</strong> ${stats.diasSoleados}</p> 
                            <p class="mb-1"><strong>Días lluviosos:</strong> ${stats.diasLluviosos}</p>
                            <p class="mb-0"><strong>Recomendación:</strong> ${stats.resumen}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        window.scrollTo(0,0);
    }
    

    calcularEstadisticas(daily) {
        const mins = daily.temperature_2m_min;
        const maxs = daily.temperature_2m_max;
        const codes = daily.weathercode;

        const minSemanal = Math.min(...mins);
        const maxSemanal = Math.max(...maxs);
        const promedio = (maxs.reduce((a,b) => a + b, 0) / maxs.length).toFixed(1);

        const diasSoleados = codes.filter(c => c === 0).length;
        const diasLluviosos = codes.filter(c => c >= 51 && c <= 67).length

        // Reglas de alerta

        let alerta = "Condiciones estables.";
        let claseAlerta = "alert-success";

        if (maxSemanal > 30) {
            alerta = "Alerta de calor: Evita exposición directa al sol.";
            claseAlerta = "alert-danger";
        } else if (codes.filter(c => c >= 51 && c <=67).length >=3) {
            alerta = "Semana lluviosa: Prepara tu paraguas y cuida tu ánimo";
            claseAlerta = "alert-warning";
        }

        let resumen = promedio > 20 ? "Ideal para actividades al aire libre." : "Semana fresca, ideal para el recogimiento.";

        return {minSemanal, maxSemanal, promedio, alerta, claseAlerta, resumen, diasSoleados, diasLluviosos };

    }
}
    

  

// Inicialización de la app
const app = new WeatherApp();
document.addEventListener('DOMContentLoaded', () => app.init());

// Función global requerida por el botón volver del HTML

function volverInicio() {
    document.getElementById('vista-home').classList.remove('d-none');
    document.getElementById('seccion-detalle').classList.add('d-none');
}

function girarTarjeta(tarjeta){
        const claseGirada = 'weather-card--flipped';
        document.querySelectorAll('.' + claseGirada).forEach(t => {
            if (t !== tarjeta) t.classList.remove(claseGirada);
        });
        tarjeta.classList.toggle(claseGirada);
    }






    


   


    
        
   

    