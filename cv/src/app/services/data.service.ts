import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Skills disponibles en tu perfil
  skills: string[] = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'Bootstrap',
    'TailwindCSS',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Docker',
    'AWS',
    'Azure',
    'Git & GitHub',
    'Agile / Scrum',
    'Figma',
  ];

  // Lista de trabajos disponibles
  jobs: string[] = [
    'Frontend Dev',
    'Backend Dev',
    'Fullstack Dev'
  ];

  getSkills(): string[] {
    return this.skills;
  }

  addSkill(skill: string) {
    const s = skill?.trim();
    if (s && !this.skills.includes(s)) {
      this.skills.push(s);
    }
  }

  getJobs(): string[] {
    return this.jobs;
  }

  addJob(job: string) {
    const j = job?.trim();
    if (j && !this.jobs.includes(j)) {
      this.jobs.push(j);
    }
  }
}
