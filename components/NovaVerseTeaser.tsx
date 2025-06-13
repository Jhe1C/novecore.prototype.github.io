import { Users, MessageCircle, Gamepad2, Trophy, ArrowRight, Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

const communityPosts = [
  {
    id: 1,
    type: 'discussion',
    title: "Best cyberpunk games for newcomers?",
    author: {
      name: "PixelExplorer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      level: 15
    },
    replies: 23,
    likes: 45,
    time: "2 hours ago",
    community: "RPG Masters"
  },
  {
    id: 2,
    type: 'showcase',
    title: "Check out my custom shader for Neon Dreams!",
    author: {
      name: "ModMaker",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      level: 28
    },
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
    views: 1240,
    likes: 89,
    time: "4 hours ago",
    community: "Creator Hub"
  },
  {
    id: 3,
    type: 'lfg',
    title: "LFG: Stellar Odyssey Co-op Campaign",
    author: {
      name: "SpaceRanger",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=40&h=40&fit=crop&crop=face",
      level: 22
    },
    players: "2/4",
    time: "1 hour ago",
    community: "LFG Central"
  }
];

const activeGroups = [
  { name: "Indie Game Developers", members: "15.2K", color: "nova-cyan" },
  { name: "DRM-Free Gaming", members: "8.7K", color: "nova-amber" },
  { name: "Speed Runners United", members: "12.1K", color: "nova-cyan" },
  { name: "Retro Gaming Revival", members: "6.3K", color: "nova-amber" }
];

export function NovaVerseTeaser() {
  return (
    <section className="py-16 bg-nova-indigo/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Users className="w-8 h-8 text-nova-cyan nova-glow" />
            <h2 className="text-4xl bg-gradient-to-r from-white via-nova-cyan to-nova-amber bg-clip-text text-transparent">
              NovaVerse™
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow gamers, share your creations, find teammates, and be part of a community that celebrates true gaming freedom.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl text-nova-cyan mb-2">847K</div>
            <div className="text-sm text-muted-foreground">Active Gamers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-nova-amber mb-2">12.4K</div>
            <div className="text-sm text-muted-foreground">Communities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-nova-cyan mb-2">89.2K</div>
            <div className="text-sm text-muted-foreground">Discussions Today</div>
          </div>
          <div className="text-center">
            <div className="text-3xl text-nova-amber mb-2">156K</div>
            <div className="text-sm text-muted-foreground">Creations Shared</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-nova-cyan" />
                <span>Happening Now</span>
              </h3>
              <Button variant="ghost" className="text-nova-cyan hover:text-nova-cyan/80">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="p-4 bg-nova-surface border-nova-surface-light hover:border-nova-cyan/30 transition-colors cursor-pointer group">
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{post.author.name}</span>
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          Lv.{post.author.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.time}</span>
                        <Badge className="text-xs bg-nova-surface-light text-nova-cyan border-nova-cyan/30">
                          {post.community}
                        </Badge>
                      </div>
                      
                      <h4 className="group-hover:text-nova-cyan transition-colors">
                        {post.title}
                      </h4>
                      
                      {post.image && (
                        <div className="mt-2">
                          <ImageWithFallback
                            src={post.image}
                            alt={post.title}
                            className="rounded-lg w-full max-w-sm h-32 object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {post.replies && (
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </div>
                        )}
                        {post.likes && (
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </div>
                        )}
                        {post.views && (
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        )}
                        {post.players && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{post.players}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Groups */}
            <Card className="p-6 bg-nova-surface border-nova-surface-light">
              <h3 className="text-lg mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-nova-cyan" />
                <span>Popular Groups</span>
              </h3>
              <div className="space-y-3">
                {activeGroups.map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-nova-surface-light transition-colors cursor-pointer">
                    <div>
                      <div className="text-sm">{group.name}</div>
                      <div className="text-xs text-muted-foreground">{group.members} members</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${group.color === 'nova-cyan' ? 'bg-nova-cyan' : 'bg-nova-amber'} nova-glow`}></div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-nova-cyan text-nova-cyan hover:bg-nova-cyan/10">
                Browse All Groups
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-nova-surface border-nova-surface-light">
              <h3 className="text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-nova-cyan text-nova-dark hover:bg-nova-cyan/90">
                  <Gamepad2 className="w-4 h-4 mr-2" />
                  Find Players (LFG)
                </Button>
                <Button variant="outline" className="w-full justify-start border-nova-amber text-nova-amber hover:bg-nova-amber/10">
                  <Trophy className="w-4 h-4 mr-2" />
                  Share Achievement
                </Button>
                <Button variant="outline" className="w-full justify-start border-nova-surface-light hover:bg-nova-surface-light">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
              </div>
            </Card>

            {/* Join CTA */}
            <div className="text-center p-6 bg-gradient-to-br from-nova-cyan/10 to-nova-amber/10 rounded-lg border border-nova-cyan/20">
              <h3 className="text-lg mb-2">Join NovaVerse™</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with gamers who value ownership and freedom
              </p>
              <Button className="bg-nova-amber text-nova-dark hover:bg-nova-amber/90 nova-amber-hover">
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}