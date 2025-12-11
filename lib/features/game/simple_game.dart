import 'package:flame/game.dart';
import 'package:flame/components.dart';
import 'package:flame/events.dart';
import 'package:flutter/material.dart';

class SimpleGame extends FlameGame with TapCallbacks {
  late PlayerComponent player;
  int score = 0;

  @override
  Color backgroundColor() => const Color(0xFF0F172A);

  @override
  Future<void> onLoad() async {
    player = PlayerComponent()
      ..position = size / 2
      ..width = 50
      ..height = 50
      ..anchor = Anchor.center;
    
    add(player);
  }

  @override
  void onTapDown(TapDownEvent event) {
    player.position = event.localPosition;
    score += 10;
    // Notify UI (overlays) here usually, but for simplicity we keep state internal or shared
  }
}

class PlayerComponent extends PositionComponent {
  final Paint _paint = Paint()..color = Colors.cyanAccent;

  @override
  void render(Canvas canvas) {
    canvas.drawRect(size.toRect(), _paint);
  }

  @override
  void update(double dt) {
    super.update(dt);
    // Add simple animation or physics here
    angle += dt; 
  }
}
