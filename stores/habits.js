import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { format, differenceInDays } from "date-fns";

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
    async updateHabit(id, updates) {
      const { $db } = useNuxtApp();
      const docRef = doc($db, "habits", id);
      await updateDoc(docRef, updates);

      const index = this.habits.findIndex((habit) => habit.id === id);
      if (index !== -1) {
        this.habits[index] = { ...this.habits[index], ...updates };
      }
    },

    //deleting habits
    async deleteHabit(id) {
      const { $db } = useNuxtApp();

      const docRef = doc($db, "habits", id);
      await deleteDoc(docRef);

      this.habits = this.habits.filter((habit) => habit.id !== id);
    },

    //completing a daily habit
    async toggleCompletion(habit) {
      const today = format(new Date(), "yyyy-MM-dd");

      if (habit.completions.includes(today)) {
        habit.completions = habit.completions.filter((date) => date !== today);
      } else {
        habit.completions.push(today);
      }
      habit.streak = this.calcStreak(habit.completions);
      console.log("banana", habit.streak);

      await this.updateHabit(habit.id, {
        completions: habit.completions,
        streak: habit.streak,
      });
    },

    // calculate habit streak
    calcStreak(completions) {
      const sortedDates = completions.sort((a, b) => new Date(b) - new Date(a));
      let streak = 0;
      let currentDate = new Date();
      for (const date of sortedDates) {
        console.log(streak);
        const diff = differenceInDays(currentDate, new Date(date));

        if (diff > 1) {
          break;
        }

        streak += 1;
        currentDate = new Date(date);
      }
      return streak;
    },
  },
});
