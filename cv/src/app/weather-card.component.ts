// src/app/weather-card.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type Current = {
  temp: number;
  wind: number;
  code: number;
  time: string;
};

type DailyForecast = {
  date: string;
  min: number;
  max: number;
  code: number;
  precipProb?: number;
};

@Component({
  selector: 'weather-card',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './weather-card.component.html',
})
export class WeatherCardComponent implements OnInit {
  // Coordenadas de Ciudad de Guatemala
  private readonly lat = 14.6349;
  private readonly lon = -90.5069;
  private readonly tz = 'America/Guatemala';

  loading = signal(true);
  error = signal<string | null>(null);

  current = signal<Current | null>(null);
  daily = signal<DailyForecast[]>([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const url = 'https://api.open-meteo.com/v1/forecast'
      + `?latitude=${this.lat}&longitude=${this.lon}`
      + '&current_weather=true'
      + '&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability'
      + '&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max'
      + `&timezone=${encodeURIComponent(this.tz)}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        try {
          // current
          const cw = data?.current_weather;
          this.current.set({
            temp: cw?.temperature ?? 0,
            wind: cw?.windspeed ?? 0,
            code: cw?.weathercode ?? 0,
            time: cw?.time ?? '',
          });

          // daily (tomamos 5 días)
          const d = data?.daily || {};
          const n = Math.min(5, (d.time?.length ?? 0));
          const out: DailyForecast[] = [];
          for (let i = 0; i < n; i++) {
            out.push({
              date: d.time[i],
              min: d.temperature_2m_min?.[i] ?? 0,
              max: d.temperature_2m_max?.[i] ?? 0,
              code: d.weathercode?.[i] ?? 0,
              precipProb: d.precipitation_probability_max?.[i] ?? undefined,
            });
          }
          this.daily.set(out);
          this.loading.set(false);
        } catch {
          this.error.set('No se pudo procesar la respuesta del clima.');
          this.loading.set(false);
        }
      },
      error: () => {
        this.error.set('No se pudo cargar el clima (conexión o CORS).');
        this.loading.set(false);
      }
    });
  }

  // Texto + emoji por weathercode (Open-Meteo)
  wcodeLabel(code: number): { label: string; emoji: string } {
    if (code === 0) return { label: 'Despejado', emoji: '☀️' };
    if ([1, 2, 3].includes(code)) return { label: 'Parcial nublado', emoji: '⛅' };
    if ([45, 48].includes(code)) return { label: 'Niebla', emoji: '🌫️' };
    if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Llovizna', emoji: '🌦️' };
    if ([61, 63, 65, 66, 67].includes(code)) return { label: 'Lluvia', emoji: '🌧️' };
    if ([71, 73, 75, 77].includes(code)) return { label: 'Nieve', emoji: '❄️' };
    if ([80, 81, 82].includes(code)) return { label: 'Chubascos', emoji: '🌦️' };
    if (code === 95) return { label: 'Tormenta', emoji: '⛈️' };
    if ([96, 99].includes(code)) return { label: 'Tormenta con granizo', emoji: '⛈️' };
    return { label: 'Tiempo variable', emoji: '🌤️' };
  }

  // Formato bonito de fecha (ES-GT)
  fmtDate(d: string): string {
    try {
      const dt = new Date(d);
      return dt.toLocaleDateString('es-GT', { weekday: 'short', day: '2-digit', month: '2-digit' });
    } catch {
      return d;
    }
  }

  // Derivados para el template
  currentEmoji = computed(() => this.current() ? this.wcodeLabel(this.current()!.code).emoji : '');
  currentLabel = computed(() => this.current() ? this.wcodeLabel(this.current()!.code).label : '');
}
