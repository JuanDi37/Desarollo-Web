import { Component, Input } from '@angular/core';

@Component({
  selector: 'skill-pill',
  standalone: true,
  template: `<span class="pill">{{ text }}</span>`,
  styles: [`
    .pill{
      display:inline-block;padding:.45rem .75rem;border-radius:9999px;
      border:1px solid rgba(99,102,241,.45);background:rgba(99,102,241,.08);
      font-size:.9rem;line-height:1;white-space:nowrap;user-select:none;
      backdrop-filter:blur(2px)
    }
    @media (prefers-color-scheme: dark){
      .pill{border-color:rgba(165,180,252,.6);background:rgba(165,180,252,.12)}
    }
  `]
})
export class SkillPillComponent {
  @Input() text = '';
}
