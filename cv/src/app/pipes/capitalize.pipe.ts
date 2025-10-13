import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    // Capitaliza cada palabra: "fullstack dev" -> "Fullstack Dev"
    return value.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
  }
}
