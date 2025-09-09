// EjJava.java
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

/**
 * Genera un saludo limitado a:
 * "Buenos días y bienvenido a mi CV",
 * "Buenas tardes y bienvenido a mi CV",
 * "Buenas noches y bienvenido a mi CV".
 */
public final class EjJava {

    // zona horaria por defecto (Guatemala)
    private static final ZoneId ZONA_GT = ZoneId.of("America/Guatemala");

    private EjJava() { /* utilitario: no instanciable */ }

    /**
     * Devuelve el saludo según la hora actual en Guatemala.
     */
    public static String getSaludo() {
        return getSaludo(ZONA_GT);
    }

    /**
     * Devuelve el saludo según la hora actual en la zona indicada.
     * Si zoneId es null, usa Guatemala.
     */
    public static String getSaludo(ZoneId zoneId) {
        ZoneId zona = (zoneId == null) ? ZONA_GT : zoneId;
        LocalTime ahora = ZonedDateTime.now(zona).toLocalTime();
        return getSaludo(ahora);
    }

    /**
     * Devuelve el saludo para una hora específica (útil para pruebas).
     */
    public static String getSaludo(LocalTime hora) {
        if (hora == null) {
            throw new IllegalArgumentException("hora no puede ser null");
        }
        String base;
        // Mañana: 05:00–11:59
        if (!hora.isBefore(LocalTime.of(5, 0)) && hora.isBefore(LocalTime.NOON)) {
            base = "Buenos días";
        }
        // Tarde: 12:00–18:59
        else if (!hora.isBefore(LocalTime.NOON) && hora.isBefore(LocalTime.of(19, 0))) {
            base = "Buenas tardes";
        }
        // Noche: 19:00–04:59
        else {
            base = "Buenas noches";
        }
        return base + " y bienvenido a mi CV";
    }

    public static void main(String[] args) {
        System.out.println(getSaludo()); // usa America/Guatemala por defecto
    }
}
