from manim import *

config.background_color = BLACK

class MyScene(Scene):
    def construct(self):
        circle = Circle(radius=2, color=BLUE, fill_opacity=1)
        square = Square(side_length=4, color=BLUE, fill_opacity=1)
        square.move_to(circle.get_center())
        self.play(FadeIn(circle))
        self.wait(0.5)
        self.play(Transform(circle, square, run_time=2))
        self.wait(1)