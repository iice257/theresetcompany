import { days, weeks, type Day } from '@/content/days';
import { DayBlock } from '@/components/DayBlock';
import { Street } from './Street';

function groupDays(week: Day[]) {
  const groups: Day[][] = [];
  for (const day of week) {
    if (!day.beats && groups.at(-1)?.every((item) => !item.beats))
      groups.at(-1)!.push(day);
    else groups.push([day]);
  }
  return groups;
}

export function Weeks() {
  return (
    <div className="sprint container">
      {weeks.map((week, i) => (
        <div key={week.start}>
          <section className="week chapter" aria-labelledby={`week-${i}`}>
            <div className="chapter-label">
              <span>WEEK {String(i + 1).padStart(2, '0')}</span>
              <span>
                DAYS {week.start}–{week.start + 6}
              </span>
            </div>
            <h2 id={`week-${i}`} className="week-title">
              {week.title}
            </h2>
            <p className="caption week-caption">{week.subtitle}</p>
            <div className="day-rail">
              {groupDays(days.slice(week.start - 1, week.start + 6)).map(
                (group) =>
                  group[0].beats ? (
                    <DayBlock key={group[0].day} day={group[0]} />
                  ) : (
                    <div
                      className="week-ledger"
                      key={group[0].day}
                      aria-label="Daily ship and reset ledger"
                    >
                      {group.map((day) => (
                        <DayBlock key={day.day} day={day} />
                      ))}
                    </div>
                  ),
              )}
            </div>
          </section>
          {i === 1 && <Street />}
        </div>
      ))}
    </div>
  );
}
