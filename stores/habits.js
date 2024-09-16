import { defineStore } from "pinia";
import { addDoc, collection } from "firebase/firestore";

export const useHabitStore = defineStore("habitStore", {
  state: () => ({
    habits: [],
  }),
  actions: {
    //fetch all habits
    //adding new habits
    async addHabit(name) {
      const { $db } = useNuxtApp();
      const habit = {
        name,
        completions: [],
        streak: 0,
      };

      const docRef = await addDoc(collection($db, "habits"), habit);
      this.habits.push({ id: docRef.id, ...habit });
    },
    //updating habits
    //deleting habits
    //completing a daily habit
    // calculate habit streak
  },
});
