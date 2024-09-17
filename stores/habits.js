import { defineStore } from "pinia";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const useHabitStore = defineStore("habitStore", {
  state: () => ({
    habits: [],
  }),
  actions: {
    //fetch all habits
    async fetchHabits() {
      const { $db } = useNuxtApp();
      const snapshot = await getDocs(collection($db, "habits"));
      this.habits = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    },
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
