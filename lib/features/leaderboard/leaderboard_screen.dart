import 'package:flutter/material.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Leaderboard')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: 10,
        separatorBuilder: (context, index) => const Divider(height: 1),
        itemBuilder: (context, index) {
          final rank = index + 1;
          final isTop3 = rank <= 3;
          
          return ListTile(
            leading: Container(
              width: 40,
              height: 40,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isTop3 ? Colors.amber.withValues(alpha: 0.2) : Colors.transparent,
                border: isTop3 ? Border.all(color: Colors.amber) : null,
              ),
              child: Text(
                '#$rank',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: isTop3 ? Colors.amber : Colors.grey,
                ),
              ),
            ),
            title: Text('Player ${index + 100}'),
            trailing: Text(
              '${20000 - (index * 500)}',
              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            subtitle: Text('Level ${10 - index}'),
          );
        },
      ),
    );
  }
}
