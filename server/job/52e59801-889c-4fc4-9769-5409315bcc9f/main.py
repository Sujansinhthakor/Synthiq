from manim import *

config.background_color = BLACK

class MyScene(Scene):
    def construct(self):
        radius = 2
        circle_center = LEFT * 4 + DOWN * 1
        circle = Circle(radius=radius, color=BLUE)
        circle.move_to(circle_center)
        axes = Axes(
            x_range=[0, 2 * PI, PI/2],
            y_range=[-1.5, 1.5, 1],
            x_length=6,
            y_length=3,
            axis_config={"color": WHITE},
        )
        axes_labels = axes.get_axis_labels(Text("x", color=WHITE), Text("sin(x)", color=WHITE))
        axes.move_to(RIGHT * 3 + UP * 0.5)
        sine_graph = always_redraw(
            lambda: axes.plot(
                lambda x: np.sin(x), 
                x_range=[0, self.tracker.get_value()],
                color=YELLOW,
                stroke_width=4
            )
        )
        theta_dot = Dot(color=RED).move_to(
            circle_center + radius * RIGHT
        )

        theta_line = always_redraw(
            lambda: Line(
                circle_center, 
                theta_dot.get_center(),
                color=GREEN
            )
        )
        
        sine_dot = always_redraw(
            lambda: Dot(color=RED).move_to(
                axes.c2p(
                    self.tracker.get_value(),
                    np.sin(self.tracker.get_value())
                )
            )
        )
        
        connector = always_redraw(
            lambda: DashedLine(
                theta_dot.get_center(),
                axes.c2p(
                    self.tracker.get_value(),
                    np.sin(self.tracker.get_value())
                ),
                color=ORANGE
            )
        )
        
        self.tracker = ValueTracker(0)

        self.add(circle, axes, axes_labels, theta_line, theta_dot, sine_graph, sine_dot, connector)

        def update_theta_dot(mob):
            angle = self.tracker.get_value()
            new_point = circle_center + radius * np.cos(angle) * RIGHT + radius * np.sin(angle) * UP
            mob.move_to(new_point)
            return mob

        theta_dot.add_updater(update_theta_dot)

        self.play(self.tracker.animate.set_value(2 * PI), run_time=6, rate_func=rate_functions.linear)

        theta_dot.remove_updater(update_theta_dot)
        self.wait(1)