import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

import { api } from "@/convex/_generated/api";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";

import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";

const TodoInput = () => {
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  const [todo, setTodo] = useState("");

  const addTodo = useMutation(api.todos.addTodos);

  const handleSubmit = async () => {
    if (todo.trim()) {
      try {
        await addTodo({ todo: todo });
        setTodo("");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to add todo. Please try again.");
      }
    }
  };

  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="What need to be done?"
          value={todo}
          onChangeText={setTodo}
          onSubmitEditing={handleSubmit}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!todo.trim()}
        >
          <LinearGradient
            colors={
              todo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[styles.addButton, !todo.trim() && styles.addButtonDisabled]}
          >
            <Ionicons name="add" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
