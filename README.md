# Weather Frontend M5 - Clima, estadísticas y bienestar.
## ** Descripción**
Aplicación web que combina datos climáticos reales con consejos de salud emocional personalizados para 12 ciudades del mundo. Cada ciudad tiene un mensaje emocional único que se activa al voltear la tarjeta.

## ** Temática**
Clima + bienestar emocional. Los usuarios ven el clima actual, pronóstico semanal, estadísticas y consejos según el tiempo.


## ** Estructura de clases (POO)*

- **WeatherApiClient** 
Responsabilidad: consumir la API de Open-Meteo.

- **Métodos** 
**async getWeatherData(lat, lon)**: contruye URL con coordenadas y devuelve datos JSON(clima actual + pronóstico 7 días)

- **WeatherApp(clase principal)** 
Responsabilidad: lógica de negocio completa.

**Propiedades**:

this.apiClient: Instancia de WeatherApiClient.
this.ciudades: Array de 12 objetos con id, nombre, lat/lon, imagen y mensaje emocional.


- **Métodos principales** 
**async init()**: incializa la app llamando crearTarjetas().

**async crearTarjetas()**: pide datos API por ciudad, genera HTML dinámico con clima actual.

**async seleccionarYMostrar(id)**: muestra detalle con pronóstico, estadísticas y alertas.

**getClimaInfo(code)**: traduce códigos weathercode de Open-Meteo a estados e íconos Bootstrap Icons.

**calcularEstadisticas(daily)**:calcula min/max/promedio semanal + días soleados/ lluviosos + alertas.


- **API de cluma utilizada**
**Nombre**: Open_meteo Weather Forescast Api(gratuita, sin clave API)
**URL base**: https://api.open-meteo.com/v1/forescast

**Parámetros usados**:
latitude, longitude (coordenadas)
current_weather=true (clima actual)
daily=temperature_2m_max,temperature_2m_min,weathercode (pronóstico semanal) timezone=auto

**Documentación**: https://open-meteo.com/en/docs

**Datos procesados**:

current_weather.weatehrcode,current_weather.temperature.

daily.weathercode[], daily.temperature_2m_min[],daily.temperature_2m_max[].



## **Cálculo de estadístcias**

- **Entrada**: daily de Open-Meteo(arrays de 7 días)

- **Salida**: 
minSemanal : Math.min(...daily.temperature_2m_min)
maxSemanal: Math.max(...daily.temperature_2m_max)
promedio: promedio de temperature_2m_max (toFixed(1))
diasSoleados: codes.filter(c => c === 0).length (despejado)
diasLluviosos: codes.filter (c => c >= 51 && c <= 67).length (lluvia)


- **Alertas**(reglas simples)

- **maxSemanal > 30:** "Alerta de calor"(alert-danger).

- **diasLluviosos >=3:** "Semana lluviosa"(alert-warning).

-**Default**: "Condiciones estables" (alert-success)



## **Funcionalidades**

**Home(12 ciudades)**
-Tarjetas glassmorphism con flip 3D (girarTarjeta()).
-Clima actual real(temperatura + ícono)
-"Cargando datos climáticos..." mientras espera API.
-Click "Ver más" => detalle.



  ## **Detalle**  
  -Imagen, clima actual, mensaje emocional.
  -Pronóstico 7 días (nombre día + min/max + estado)
  **Análisis semanal**

  Mín: X°C | Máx: Y°C | Promedio : Z°C
  Días soleados : A | Días lluviosos: B
  Recomendación: ...

  **Alertas** dinámicas con Bootstrap badges.


  ## **Navegación SPA**
  Botón "Volver" + navbar "Home" => volverInicio().
  Sin recargas, solo DOM manipulation.

  **Tecnologías**
  HTML + Bootstrap 5.3.3(responsive grid, navbar, cards)

  JavaScript ES6 (clases, async/await, template literals, arrow functions)

  Bootstrap Icons(íconos clima)

  Open-Meteo API (datos reales)





## **Commits**
Commits descriptivos incluídos.



## ++Enlace al repositorio público**
[Ver repositorio completo] https://github.com/KarlaBlackie/Weather-frontend-m5

**Desarrollado por Karla Jara Mena**
*Bootcamp frontend Trainee - 2026*

KarlaBlackie
Karla Irene Jara Mena
