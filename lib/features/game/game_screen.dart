import 'package:code/features/game/simple_game.dart';
import 'package:flame/game.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons/lucide_icons.dart';

class GameScreen extends StatelessWidget {
  const GameScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          GameWidget(
            game: SimpleGame(),
          ),
          Positioned(
            top: 40,
            left: 20,
            child: IconButton.filled(
              icon: const Icon(LucideIcons.arrowLeft),
              onPressed: () => context.pop(),
              style: IconButton.styleFrom(
                backgroundColor: Colors.black54,
                foregroundColor: Colors.white,
              ),
            ),
          ),
          Positioned(
            top: 40,
            right: 20,
            child: IconButton.filled(
              icon: const Icon(LucideIcons.pause),
              onPressed: () {
                // Show pause menu
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Paused'),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('Resume'),
                      ),
                      TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                          context.pop();
                        },
                        child: const Text('Quit'),
                      ),
                    ],
                  ),
                );
              },
              style: IconButton.styleFrom(
                backgroundColor: Colors.black54,
                foregroundColor: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
