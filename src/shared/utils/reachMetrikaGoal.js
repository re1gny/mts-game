export function reachMetrikaGoal(goalName) {
  if (window.ym && window.ymId) {
    window.ym(window.ymId, 'reachGoal', goalName);
  }
}
