from manim import *

config.background_color = BLACK

class MyScene(Scene):
    def construct(self):
        radius = 2
        circle_center = LEFT * 3
        sine_start = RIGHT * 1 + DOWN * 2.5
        sine_length = 6
        sine_height = 2
        
        circle = Circle(radius=radius, color=BLUE).move_to(circle_center)
        moving_dot = Dot(circle.point_at_angle(0), color=WHITE, radius=0.08)
        horizontal_line = Line(start=circle_center + DOWN * (radius + 0.2), end=circle_center + UP * (radius + 0.2), color=DARK_GREY, stroke_width=1)
        vertical_line = Line(start=circle_center + LEFT * (radius + 0.2), end=circle_center + RIGHT * (radius + 0.2), color=DARK_GREY, stroke_width=1)
        
        sine_graph = VMobject(color=YELLOW, stroke_width=3)
        sine_points = []
        sine_tracker = ValueTracker(0)
        
        self.play(Create(circle), Create(horizontal_line), Create(vertical_line))
        self.play(FadeIn(moving_dot), run_time=0.5)
        
        def get_point_on_circle(t):
            angle = t * 2 * PI
            return circle_center + radius * np.array([np.cos(angle), np.sin(angle), 0])
        
        def get_sine_point(t):
            x = sine_start[0] + t * sine_length
            y = sine_start[1] + np.sin(t * 2 * PI) * sine_height / 2
            return np.array([x, y, 0])
        
        dot_on_sine = Dot(get_sine_point(0), color=WHITE, radius=0.08)
        v_line = always_redraw(lambda: Line(moving_dot.get_center(), dot_on_sine.get_center(), color=GREEN, stroke_width=2, stroke_opacity=0.6))
        
        self.add(dot_on_sine, v_line)
        
        def update_trace(sine_graph):
            t = sine_tracker.get_value()
            steps = 250
            curr_points = [get_sine_point(a / steps * t) for a in range(int(steps * t) + 1)]
            if curr_points:
                sine_graph.set_points_smoothly(curr_points)
            return sine_graph

        sine_graph.add_updater(update_trace)
        self.add(sine_graph)

        def update_dots():
            t = sine_tracker.get_value()
            moving_dot.move_to(get_point_on_circle(t))
            dot_on_sine.move_to(get_sine_point(t))

        moving_dot.add_updater(lambda m: update_dots())

        self.play(
            sine_tracker.animate.set_value(1),
            rate_func=linear,
            run_time=6
        )
        
        moving_dot.clear_updaters()
        sine_graph.clear_updaters()

        self.wait(1)

        self.play(
            Indicate(dot_on_sine, color=WHITE, scale_factor=1.5),
            run_time=1
        )
        
        self.wait(1)