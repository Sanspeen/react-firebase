package co.com.sofka.questions.usecases;

import static org.junit.jupiter.api.Assertions.*;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.List;

@SpringBootTest
class GetUseCaseTest {

    @MockBean
    private QuestionRepository questionRepository;
    @SpyBean
    private GetUseCase getQuestion;

    @Test
    @DisplayName("Obtener pregunta.")
    public void get(){

        var questionDTO = new QuestionDTO("abc","123","Would I get a job in sofka?", "OPEN","TECHNOLOGY AND COMPUTER", "santiagoF@gmail.com");
        var question= new Question();
        question.setId("abc");
        question.setQuestion("Would I get a job in sofka?");
        question.setUserId("123");
        question.setType("OPEN");
        question.setCategory("TECHNOLOGY AND COMPUTER");

        Mockito.when(questionRepository.findById(Mockito.any(String.class))).thenReturn(Mono.just(question));

        var respuesta = getQuestion.apply("123");
        Assertions.assertEquals(respuesta.block().getQuestion(), "Would I get a job in sofka?");
    }
}